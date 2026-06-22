const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// GET user's watchlist
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user.watchlist || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADD stock to watchlist
router.post('/', auth, async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'Stock name is required' });

        const user = await User.findById(req.user);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (!user.watchlist.includes(name)) {
            user.watchlist.push(name);
            await user.save();
        }

        res.json(user.watchlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE stock from watchlist
router.delete('/:name', auth, async (req, res) => {
    try {
        const { name } = req.params;
        const user = await User.findById(req.user);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.watchlist = user.watchlist.filter(s => s !== name);
        await user.save();

        res.json(user.watchlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SAVE reordered watchlist
router.put('/', auth, async (req, res) => {
    try {
        const { watchlist } = req.body;
        if (!watchlist || !Array.isArray(watchlist)) {
            return res.status(400).json({ message: 'Watchlist array is required' });
        }

        const user = await User.findById(req.user);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.watchlist = watchlist;
        await user.save();

        res.json(user.watchlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
