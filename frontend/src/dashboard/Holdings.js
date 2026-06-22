import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { formatCurrency } from '../utils/formatters';

export default function Holdings(props) {
    const context = useOutletContext();
    const holdings = context?.holdings || props.holdings || [];

    const totalInvested = holdings.reduce((sum, h) => sum + (h.qty * h.avgPrice), 0);
    const totalCurrent = holdings.reduce((sum, h) => sum + (h.qty * h.price), 0);
    const totalPnL = totalCurrent - totalInvested;
    const totalPnLPct = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

    return (
        <div>
            <div className="workspace-title">
                <span>Holdings ({holdings.length})</span>
            </div>

            {holdings.length === 0 ? (
                <div className="text-center p-5 border rounded bg-white text-muted mt-4">
                    <p className="mb-0 fs-6">You do not hold any stocks in your demat account yet.</p>
                    <p className="small text-muted mt-1">Use the watchlist on the left to purchase stocks.</p>
                </div>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="kite-table">
                            <thead>
                                <tr>
                                    <th>Instrument</th>
                                    <th className="text-right">Qty.</th>
                                    <th className="text-right">Avg. Cost</th>
                                    <th className="text-right">LTP</th>
                                    <th className="text-right">Cur. Value</th>
                                    <th className="text-right">P&L</th>
                                    <th className="text-right">Net Chg.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {holdings.map((h) => {
                                    const cost = h.qty * h.avgPrice;
                                    const current = h.qty * h.price;
                                    const pnl = current - cost;
                                    const pnlPct = (pnl / cost) * 100;

                                    return (
                                        <tr key={h._id || h.name}>
                                            <td>{h.name}</td>
                                            <td className="text-right">{h.qty}</td>
                                            <td className="text-right">{formatCurrency(h.avgPrice)}</td>
                                            <td className="text-right">{formatCurrency(h.price)}</td>
                                            <td className="text-right">{formatCurrency(current)}</td>
                                            <td className={`text-right ${pnl >= 0 ? 'text-up' : 'text-down'}`}>
                                                {formatCurrency(pnl)}
                                            </td>
                                            <td className={`text-right ${pnl >= 0 ? 'text-up' : 'text-down'}`}>
                                                {pnl >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Holdings Metrics Summary Row */}
                    <div className="row mt-4 p-4 bg-light border rounded mx-0">
                        <div className="col-sm-4 text-center border-end">
                            <span className="small text-muted d-block">Total Investment</span>
                            <span className="fs-5 fw-semibold">{formatCurrency(totalInvested)}</span>
                        </div>
                        <div className="col-sm-4 text-center border-end">
                            <span className="small text-muted d-block">Current Value</span>
                            <span className="fs-5 fw-semibold">{formatCurrency(totalCurrent)}</span>
                        </div>
                        <div className="col-sm-4 text-center">
                            <span className="small text-muted d-block">Total P&L</span>
                            <span className={`fs-5 fw-semibold ${totalPnL >= 0 ? 'text-up' : 'text-down'}`}>
                                {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
                                <span className="small fs-7 ms-1">({totalPnL >= 0 ? '+' : ''}{totalPnLPct.toFixed(2)}%)</span>
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
