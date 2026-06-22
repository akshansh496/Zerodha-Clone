const mongoose = require('mongoose');

const HoldingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    avgPrice: { type: Number, required: true },
    price: { type: Number, required: true } // Current LTP
}, { timestamps: true });

module.exports = mongoose.model('Holding', HoldingSchema);
