const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    funds: { type: Number, default: 100000.00 }, // ₹1,00,000 initial virtual cash
    watchlist: { type: [String], default: ['INFY', 'RELIANCE', 'TCS', 'WIPRO', 'HDFCBANK'] }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
