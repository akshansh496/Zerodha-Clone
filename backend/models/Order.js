const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true }, // Ordered/executed price
    mode: { type: String, enum: ['BUY', 'SELL'], required: true },
    type: { type: String, enum: ['MARKET', 'LIMIT'], required: true },
    status: { type: String, enum: ['PENDING', 'COMPLETED', 'CANCELLED'], default: 'PENDING' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
