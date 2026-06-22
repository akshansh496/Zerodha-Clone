const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Holding = require('../models/Holding');
const Position = require('../models/Position');
const User = require('../models/User');
const { stocksRaw } = require('../utils/stocksStore');

// GET holdings (enriched with live price LTP)
router.get('/holdings', auth, async (req, res) => {
    try {
        const holdings = await Holding.find({ userId: req.user });
        const currentStocks = stocksRaw();

        const enrichedHoldings = holdings.map(h => {
            const stockData = currentStocks.find(s => s.name === h.name);
            const livePrice = stockData ? stockData.price : h.price;
            return {
                _id: h._id,
                name: h.name,
                qty: h.qty,
                avgPrice: h.avgPrice,
                price: livePrice // Live LTP
            };
        });

        res.json(enrichedHoldings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET positions (enriched with live price LTP)
router.get('/positions', auth, async (req, res) => {
    try {
        const positions = await Position.find({ userId: req.user });
        const currentStocks = stocksRaw();

        const enrichedPositions = positions.map(p => {
            const stockData = currentStocks.find(s => s.name === p.name);
            const livePrice = stockData ? stockData.price : p.price;
            return {
                _id: p._id,
                name: p.name,
                qty: p.qty,
                avgPrice: p.avgPrice,
                price: livePrice,
                status: p.status
            };
        });

        res.json(enrichedPositions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET funds
router.get('/funds', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ funds: user.funds });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADD simulated funds
router.post('/funds/add', auth, async (req, res) => {
    try {
        const { amount } = req.body;
        const parsedAmount = parseFloat(amount);

        if (!parsedAmount || parsedAmount <= 0) {
            return res.status(400).json({ message: 'Please enter a valid amount' });
        }

        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.funds += parsedAmount;
        await user.save();

        res.json({ message: 'Funds added successfully', funds: user.funds });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
