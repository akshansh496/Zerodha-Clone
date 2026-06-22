const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    avgPrice: { type: Number, required: true },
    price: { type: Number, required: true }, // Current LTP
    status: { type: String, default: 'active' } // active or closed
}, { timestamps: true });

module.exports = mongoose.model('Position', PositionSchema);
