import React from 'react';

export default function Positions({ positions }) {
    const totalPnL = positions.reduce((sum, p) => {
        const cost = p.qty * p.avgPrice;
        const current = p.qty * p.price;
        return sum + (current - cost);
    }, 0);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(val);
    };

    return (
        <div>
            <div className="workspace-title">
                <span>Positions ({positions.length})</span>
            </div>

            {positions.length === 0 ? (
                <div className="text-center p-5 border rounded bg-white text-muted mt-4">
                    <p className="mb-0 fs-6">You do not have any open positions today.</p>
                    <p className="small text-muted mt-1">Intraday positions and active derivatives trades will appear here.</p>
                </div>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="kite-table">
                            <thead>
                                <tr>
                                    <th>Instrument</th>
                                    <th>Product</th>
                                    <th className="text-right">Qty.</th>
                                    <th className="text-right">Avg. Price</th>
                                    <th className="text-right">LTP</th>
                                    <th className="text-right">P&L</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {positions.map((p) => {
                                    const cost = p.qty * p.avgPrice;
                                    const current = p.qty * p.price;
                                    const pnl = current - cost;

                                    return (
                                        <tr key={p._id || p.name}>
                                            <td>{p.name}</td>
                                            <td><span className="badge bg-light text-dark text-uppercase small">MIS</span></td>
                                            <td className="text-right">{p.qty}</td>
                                            <td className="text-right">{formatCurrency(p.avgPrice)}</td>
                                            <td className="text-right">{formatCurrency(p.price)}</td>
                                            <td className={`text-right ${pnl >= 0 ? 'text-up' : 'text-down'}`}>
                                                {formatCurrency(pnl)}
                                            </td>
                                            <td>
                                                <span className={`status-badge ${p.status === 'active' ? 'pending' : 'completed'}`}>
                                                    {p.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="row mt-4 p-4 bg-light border rounded mx-0 justify-content-end">
                        <div className="col-sm-4 text-center">
                            <span className="small text-muted d-block">Combined Positions P&L</span>
                            <span className={`fs-5 fw-semibold ${totalPnL >= 0 ? 'text-up' : 'text-down'}`}>
                                {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
