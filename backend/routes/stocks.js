const express = require('express');
const router = express.Router();
const { getStocks } = require('../utils/stocksStore');

router.get('/', (req, res) => {
    res.json(getStocks());
});

module.exports = router;
