import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import { formatCurrency } from '../utils/formatters';

export default function Funds(props) {
    const context = useOutletContext();
    const user = context?.user || props.user;
    const onAddFunds = context?.onAddFunds || props.onAddFunds;

    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        const parsed = parseFloat(amount);
        if (!parsed || parsed <= 0) {
            setError('Please enter a valid positive amount.');
            return;
        }

        setLoading(true);
        try {
            await onAddFunds(parsed);
            setSuccess(`Successfully added ${formatCurrency(parsed)} to your account!`);
            setAmount('');
        } catch (err) {
            setError(err.message || 'Failed to add funds. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="workspace-title">
                <span>Funds</span>
            </div>

            <div className="row g-4 mt-1">
                {/* Available Margin Card */}
                <div className="col-md-6">
                    <div className="summary-widget-card" style={{ minHeight: '220px' }}>
                        <div className="summary-widget-header">
                            <AccountBalanceIcon style={{ color: '#ff5722', fontSize: '18px' }} />
                            <span>Equity Margin Statement</span>
                        </div>

                        <div className="mb-3">
                            <span className="summary-text-muted d-block">Available Margin (Free Cash)</span>
                            <span className="summary-value-large d-block mt-1" style={{ color: '#387ed1', fontWeight: '500' }}>
                                {formatCurrency(user?.funds)}
                            </span>
                        </div>

                        <div className="row border-top pt-3 mt-3">
                            <div className="col-6">
                                <span className="small text-muted d-block">Used Margin</span>
                                <span className="fw-semibold text-muted">₹0.00</span>
                            </div>
                            <div className="col-6">
                                <span className="small text-muted d-block">Total Collateral</span>
                                <span className="fw-semibold text-muted">₹0.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Virtual Cash Form */}
                <div className="col-md-6">
                    <div className="summary-widget-card" style={{ minHeight: '220px' }}>
                        <div className="summary-widget-header">
                            <PaymentIcon style={{ color: '#4caf50', fontSize: '18px' }} />
                            <span>Deposit Virtual Funds</span>
                        </div>

                        <p className="small text-muted">Add virtual money to practice buying and selling mock equities.</p>

                        {error && <div className="alert alert-danger py-1 small">{error}</div>}
                        {success && <div className="alert alert-success py-1 small">{success}</div>}

                        <form onSubmit={handleSubmit} className="funds-input-group mt-3">
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder="Amount in ₹" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                min="1"
                                step="any"
                                required
                                disabled={loading}
                            />
                            <button type="submit" className="btn-funds-add" disabled={loading}>
                                {loading ? 'Adding...' : 'Add Cash'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
