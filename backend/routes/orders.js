const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Holding = require('../models/Holding');
const Position = require('../models/Position');
const User = require('../models/User');
const { stocksRaw } = require('../utils/stocksStore');

// Helper to execute order
const executeOrder = async (order, currentPrice, user) => {
    const totalCost = order.qty * currentPrice;
    
    if (order.mode === 'BUY') {
        if (user.funds < totalCost) {
            order.status = 'CANCELLED';
            await order.save();
            return false;
        }

        // Deduct funds
        user.funds -= totalCost;
        await user.save();

        // Update Holdings
        let holding = await Holding.findOne({ userId: user._id, name: order.name });
        if (holding) {
            holding.avgPrice = ((holding.qty * holding.avgPrice) + (order.qty * currentPrice)) / (holding.qty + order.qty);
            holding.qty += order.qty;
            holding.price = currentPrice;
            await holding.save();
        } else {
            holding = new Holding({
                userId: user._id,
                name: order.name,
                qty: order.qty,
                avgPrice: currentPrice,
                price: currentPrice
            });
            await holding.save();
        }

        // Update Positions
        let position = await Position.findOne({ userId: user._id, name: order.name, status: 'active' });
        if (position) {
            position.avgPrice = ((position.qty * position.avgPrice) + (order.qty * currentPrice)) / (position.qty + order.qty);
            position.qty += order.qty;
            position.price = currentPrice;
            await position.save();
        } else {
            position = new Position({
                userId: user._id,
                name: order.name,
                qty: order.qty,
                avgPrice: currentPrice,
                price: currentPrice
            });
            await position.save();
        }

    } else if (order.mode === 'SELL') {
        // Verify holding exists and has enough quantity
        const holding = await Holding.findOne({ userId: user._id, name: order.name });
        if (!holding || holding.qty < order.qty) {
            order.status = 'CANCELLED';
            await order.save();
            return false;
        }

        // Add funds
        user.funds += totalCost;
        await user.save();

        // Update Holdings
        holding.qty -= order.qty;
        holding.price = currentPrice;
        if (holding.qty === 0) {
            await Holding.deleteOne({ _id: holding._id });
        } else {
            await holding.save();
        }

        // Update Positions
        let position = await Position.findOne({ userId: user._id, name: order.name, status: 'active' });
        if (position) {
            position.qty -= order.qty;
            position.price = currentPrice;
            if (position.qty === 0) {
                position.status = 'closed';
            }
            await position.save();
        }
    }

    order.price = currentPrice;
    order.status = 'COMPLETED';
    await order.save();
    return true;
};

// Place Order Route
router.post('/', auth, async (req, res) => {
    try {
        const { name, qty, price, mode, type } = req.body;
        const parsedQty = parseInt(qty);
        const parsedPrice = parseFloat(price);

        if (!name || !parsedQty || parsedQty <= 0 || !mode || !type) {
            return res.status(400).json({ message: 'Invalid order input data' });
        }

        // Find current price in store
        const currentStocks = stocksRaw();
        const stockData = currentStocks.find(s => s.name === name);
        if (!stockData) {
            return res.status(404).json({ message: 'Stock not found' });
        }
        const currentPrice = stockData.price;

        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create Order record
        const order = new Order({
            userId: req.user,
            name,
            qty: parsedQty,
            price: type === 'LIMIT' ? parsedPrice : currentPrice,
            mode,
            type,
            status: type === 'LIMIT' ? 'PENDING' : 'COMPLETED'
        });

        if (type === 'MARKET') {
            const success = await executeOrder(order, currentPrice, user);
            if (!success) {
                return res.status(400).json({ message: 'Order execution failed: insufficient funds or holdings' });
            }
            return res.status(201).json({ message: 'Market order executed successfully', order });
        } else {
            // Check pre-conditions for limit order to avoid obvious errors
            if (mode === 'BUY') {
                const totalCost = parsedQty * parsedPrice;
                if (user.funds < totalCost) {
                    return res.status(400).json({ message: 'Insufficient funds for this limit order' });
                }
            } else {
                const holding = await Holding.findOne({ userId: req.user, name });
                if (!holding || holding.qty < parsedQty) {
                    return res.status(400).json({ message: 'Insufficient holdings to place sell limit order' });
                }
            }
            await order.save();
            return res.status(201).json({ message: 'Limit order placed successfully', order });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Retrieve Order History
router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cancel Pending Order
router.delete('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.id || req.params.id, userId: req.user });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (order.status !== 'PENDING') {
            return res.status(400).json({ message: 'Only pending orders can be cancelled' });
        }
        order.status = 'CANCELLED';
        await order.save();
        res.json({ message: 'Order cancelled successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Background matching engine for LIMIT orders
setInterval(async () => {
    try {
        const pendingOrders = await Order.find({ status: 'PENDING' });
        if (pendingOrders.length === 0) return;

        const currentStocks = stocksRaw();

        for (const order of pendingOrders) {
            const stockData = currentStocks.find(s => s.name === order.name);
            if (!stockData) continue;

            const currentPrice = stockData.price;
            const user = await User.findById(order.userId);
            if (!user) continue;

            let trigger = false;
            if (order.mode === 'BUY' && currentPrice <= order.price) {
                trigger = true;
            } else if (order.mode === 'SELL' && currentPrice >= order.price) {
                trigger = true;
            }

            if (trigger) {
                await executeOrder(order, currentPrice, user);
            }
        }
    } catch (err) {
        console.error('Limit order engine error:', err);
    }
}, 3000);

module.exports = router;
