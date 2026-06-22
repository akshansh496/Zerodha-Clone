const express = require('express');
const router = express.Router();
const { getStocks, stocksRaw } = require('../utils/stocksStore');

// GET listing of all stocks
router.get('/', (req, res) => {
    res.json(getStocks());
});

// GET historical candle data (OHLC) for a specific stock
router.get('/:name/candles', (req, res) => {
    try {
        const { name } = req.params;
        const timeframe = req.query.timeframe || '1D';

        const currentStocks = stocksRaw();
        const stock = currentStocks.find(s => s.name === name.toUpperCase());
        if (!stock) {
            return res.status(404).json({ message: 'Stock not found' });
        }

        const currentPrice = stock.price;
        const candles = [];
        let candleCount = 100;
        let intervalSeconds = 300; // 5 minutes default (for 1D)

        switch (timeframe) {
            case '1D':
                intervalSeconds = 300; // 5m
                candleCount = 80;
                break;
            case '1W':
                intervalSeconds = 1800; // 30m
                candleCount = 100;
                break;
            case '1M':
                intervalSeconds = 14400; // 4 hours
                candleCount = 120;
                break;
            case '1Y':
                intervalSeconds = 86400; // 1 day
                candleCount = 150;
                break;
            default:
                intervalSeconds = 300;
        }

        const now = Math.floor(Date.now() / 1000);
        let lastClose = currentPrice;

        for (let i = 0; i < candleCount; i++) {
            const time = now - (i * intervalSeconds);
            const walk = (Math.random() * 20 - 10); // Price fluctuation
            
            const close = lastClose;
            const open = lastClose - walk;
            const low = Math.min(open, close) - (Math.random() * 3);
            const high = Math.max(open, close) + (Math.random() * 3);

            candles.push({
                time,
                open: parseFloat(open.toFixed(2)),
                high: parseFloat(high.toFixed(2)),
                low: parseFloat(low.toFixed(2)),
                close: parseFloat(close.toFixed(2))
            });

            lastClose = open; // Chain candles backward
        }

        // Return candles in ascending chronological order
        res.json(candles.reverse());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
