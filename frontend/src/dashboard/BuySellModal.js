import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/formatters';

export default function BuySellModal({ activeStock, mode, onClose, onSubmitOrder }) {
    const [qty, setQty] = useState('1');
    const [price, setPrice] = useState(activeStock ? activeStock.price.toString() : '');
    const [type, setType] = useState('MARKET'); // MARKET or LIMIT
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (activeStock) {
            setPrice(activeStock.price.toString());
        }
    }, [activeStock]);

    if (!activeStock) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        const parsedQty = parseInt(qty);
        if (!parsedQty || parsedQty <= 0) {
            setError('Please enter a valid quantity.');
            return;
        }

        const parsedPrice = parseFloat(price);
        if (type === 'LIMIT' && (!parsedPrice || parsedPrice <= 0)) {
            setError('Please enter a valid price for limit orders.');
            return;
        }

        setSubmitting(true);
        try {
            await onSubmitOrder({
                name: activeStock.name,
                qty: parsedQty,
                price: type === 'LIMIT' ? parsedPrice : activeStock.price,
                mode,
                type
            });
            onClose();
        } catch (err) {
            setError(err.message || 'Order submission failed.');
        } finally {
            setSubmitting(false);
        }
    };

    const totalCost = parseInt(qty) * (type === 'LIMIT' ? parseFloat(price) || 0 : activeStock.price);

    return (
        <div className="kite-modal-overlay" onClick={onClose}>
            <div className="kite-modal-card" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className={`modal-header-section ${mode.toLowerCase()}`}>
                    <h5 className="modal-title-text">
                        {mode} {activeStock.name} x {qty} Qty
                    </h5>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit}>
                    <div className="modal-body-section">
                        <div className="d-flex justify-content-between mb-4 border-bottom pb-2">
                            <div>
                                <span className="small text-muted d-block">Last Traded Price</span>
                                <span className="fw-semibold">{formatCurrency(activeStock.price)}</span>
                            </div>
                            <div className="text-end">
                                <span className="small text-muted d-block">Est. Total Cost</span>
                                <span className="fw-semibold">{formatCurrency(isNaN(totalCost) ? 0 : totalCost)}</span>
                            </div>
                        </div>

                        {error && <div className="alert alert-danger py-1 small">{error}</div>}

                        {/* Order Type Selector */}
                        <div className="order-type-tabs">
                            <label className="order-type-option">
                                <input 
                                    type="radio" 
                                    name="orderType" 
                                    value="MARKET"
                                    checked={type === 'MARKET'}
                                    onChange={() => setType('MARKET')}
                                    disabled={submitting}
                                />
                                Market
                            </label>
                            <label className="order-type-option">
                                <input 
                                    type="radio" 
                                    name="orderType" 
                                    value="LIMIT"
                                    checked={type === 'LIMIT'}
                                    onChange={() => setType('LIMIT')}
                                    disabled={submitting}
                                />
                                Limit
                            </label>
                        </div>

                        {/* Form Inputs */}
                        <div className="form-row-group">
                            <div className="form-field-item">
                                <label>Qty</label>
                                <input 
                                    type="number" 
                                    min="1"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                    required
                                    disabled={submitting}
                                />
                            </div>
                            <div className="form-field-item">
                                <label>Price</label>
                                <input 
                                    type="number" 
                                    step="0.05"
                                    value={type === 'MARKET' ? activeStock.price : price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    disabled={type === 'MARKET' || submitting}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="modal-footer-section">
                        <span className="small text-muted">Margin req. ₹{isNaN(totalCost) ? 0 : totalCost.toFixed(2)}</span>
                        <div className="d-flex gap-2">
                            <button 
                                type="button" 
                                className="btn-modal-cancel" 
                                onClick={onClose}
                                disabled={submitting}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className={`btn-modal-action ${mode.toLowerCase()}`}
                                disabled={submitting}
                            >
                                {submitting ? 'Submitting...' : mode}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
