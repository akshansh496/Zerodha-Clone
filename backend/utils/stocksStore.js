let stocks = [
    { name: 'INFY', fullName: 'Infosys Ltd.', price: 1425.50, prevPrice: 1420.00 },
    { name: 'RELIANCE', fullName: 'Reliance Industries Ltd.', price: 2450.75, prevPrice: 2465.00 },
    { name: 'TCS', fullName: 'Tata Consultancy Services Ltd.', price: 3210.20, prevPrice: 3200.00 },
    { name: 'WIPRO', fullName: 'Wipro Ltd.', price: 385.40, prevPrice: 387.20 },
    { name: 'HDFCBANK', fullName: 'HDFC Bank Ltd.', price: 1550.30, prevPrice: 1540.00 },
    { name: 'TATAMOTORS', fullName: 'Tata Motors Ltd.', price: 620.15, prevPrice: 615.50 },
    { name: 'SBIN', fullName: 'State Bank of India', price: 575.40, prevPrice: 580.00 },
    { name: 'ITC', fullName: 'ITC Ltd.', price: 440.10, prevPrice: 438.90 },
    { name: 'BHARTIARTL', fullName: 'Bharti Airtel Ltd.', price: 860.25, prevPrice: 855.00 },
    { name: 'ICICIBANK', fullName: 'ICICI Bank Ltd.', price: 945.80, prevPrice: 948.20 }
];

let broadcastCallback = null;

const getStocks = () => {
    return stocks.map(stock => {
        const diff = stock.price - stock.prevPrice;
        const percent = (diff / stock.prevPrice) * 100;
        return {
            ...stock,
            isDown: diff < 0,
            percent: percent.toFixed(2),
            change: diff.toFixed(2)
        };
    });
};

const updatePrices = () => {
    stocks = stocks.map(stock => {
        const changePercent = (Math.random() * 0.8 - 0.4) / 100; // -0.4% to +0.4%
        const newPrice = Math.max(10, stock.price * (1 + changePercent));
        return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2))
        };
    });
    if (broadcastCallback) {
        broadcastCallback(getStocks());
    }
};

// Start simulated ticks
setInterval(updatePrices, 2500);

const setBroadcastCallback = (cb) => {
    broadcastCallback = cb;
};

module.exports = {
    getStocks,
    stocksRaw: () => stocks,
    setBroadcastCallback
};
