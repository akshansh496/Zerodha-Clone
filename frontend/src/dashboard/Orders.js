import React from 'react';

export default function Orders({ orders, onCancelOrder }) {
    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(val);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' ' + 
               date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    };

    return (
        <div>
            <div className="workspace-title">
                <span>Order Book ({orders.length})</span>
            </div>

            {orders.length === 0 ? (
                <div className="text-center p-5 border rounded bg-white text-muted mt-4">
                    <p className="mb-0 fs-6">You haven't placed any orders today.</p>
                    <p className="small text-muted mt-1">Placing market or limit orders from the watchlist will populate this log.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="kite-table">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Type</th>
                                <th>Instrument</th>
                                <th>Product</th>
                                <th className="text-right">Qty.</th>
                                <th className="text-right">Ordered Price</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                return (
                                    <tr key={order._id}>
                                        <td style={{ fontSize: '12.5px', color: '#666' }}>{formatDate(order.createdAt)}</td>
                                        <td>
                                            <span className={`order-badge ${order.mode === 'BUY' ? 'buy' : 'sell'}`}>
                                                {order.mode}
                                            </span>
                                        </td>
                                        <td><strong>{order.name}</strong> <span className="small text-muted">{order.type}</span></td>
                                        <td><span className="badge bg-light text-dark small text-uppercase">MIS</span></td>
                                        <td className="text-right">{order.qty}</td>
                                        <td className="text-right">{formatCurrency(order.price)}</td>
                                        <td>
                                            <span className={`status-badge ${order.status.toLowerCase()}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            {order.status === 'PENDING' ? (
                                                <button 
                                                    className="btn btn-sm btn-outline-danger py-0 px-2 fw-medium" 
                                                    style={{ fontSize: '11px' }}
                                                    onClick={() => onCancelOrder(order._id)}
                                                >
                                                    Cancel
                                                </button>
                                            ) : (
                                                <span className="text-muted small">-</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
