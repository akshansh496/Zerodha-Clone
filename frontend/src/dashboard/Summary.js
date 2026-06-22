import React, { useEffect, useRef } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PieChartIcon from '@mui/icons-material/PieChart';

export default function Summary({ user, holdings }) {
    const canvasRef = useRef(null);

    const investedVal = holdings.reduce((sum, h) => sum + (h.qty * h.avgPrice), 0);
    const currentVal = holdings.reduce((sum, h) => sum + (h.qty * h.price), 0);
    const totalPnL = currentVal - investedVal;
    const pnlPercent = investedVal > 0 ? (totalPnL / investedVal) * 100 : 0;
    const totalEquity = currentVal + (user?.funds || 0);

    useEffect(() => {
        if (!canvasRef.current || holdings.length === 0) return;

        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, 200, 200);

        // Group holdings by name and calculate shares value
        const data = holdings.map(h => ({
            name: h.name,
            value: h.qty * h.price
        }));
        
        const totalValue = data.reduce((sum, d) => sum + d.value, 0);

        let startAngle = 0;
        const colors = [
            '#387ed1', '#4caf50', '#ff9800', '#9c27b0', '#e91e63', 
            '#00bcd4', '#009688', '#ffeb3b', '#795548', '#607d8b'
        ];

        data.forEach((d, index) => {
            const sliceAngle = (d.value / totalValue) * 2 * Math.PI;
            ctx.fillStyle = colors[index % colors.length];
            ctx.beginPath();
            ctx.moveTo(100, 100);
            ctx.arc(100, 100, 80, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();

            startAngle += sliceAngle;
        });

        // Draw center hole for doughnut chart look
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(100, 100, 45, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

    }, [holdings]);

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
                <span>Hi, {user?.username || 'Trader'}</span>
            </div>

            <div className="portfolio-summary-bar">
                <div className="portfolio-summary-item">
                    <span className="portfolio-summary-label">Equity value</span>
                    <span className="portfolio-summary-value">{formatCurrency(currentVal)}</span>
                </div>
                <div className="portfolio-summary-item">
                    <span className="portfolio-summary-label">Cash Margin</span>
                    <span className="portfolio-summary-value">{formatCurrency(user?.funds || 0)}</span>
                </div>
                <div className="portfolio-summary-item">
                    <span className="portfolio-summary-label">Total Portfolio Net Worth</span>
                    <span className="portfolio-summary-value" style={{ fontWeight: '500' }}>{formatCurrency(totalEquity)}</span>
                </div>
            </div>

            <div className="summary-widget-container">
                {/* Equity/Portfolio Summary Card */}
                <div className="summary-widget-card">
                    <div className="summary-widget-header">
                        <TrendingUpIcon style={{ color: '#ff5722', fontSize: '18px' }} />
                        <span>Equity Portfolio Performance</span>
                    </div>

                    <div className="mb-4">
                        <span className="summary-text-muted d-block">Invested Value</span>
                        <h4 className="fw-normal">{formatCurrency(investedVal)}</h4>
                    </div>

                    <div className="mb-4">
                        <span className="summary-text-muted d-block">Current Value</span>
                        <h4 className="fw-normal">{formatCurrency(currentVal)}</h4>
                    </div>

                    <div>
                        <span className="summary-text-muted d-block">Total Profit & Loss</span>
                        <h3 className={`fw-normal ${totalPnL >= 0 ? 'text-up' : 'text-down'}`}>
                            {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)} 
                            <span className="fs-6 ms-2">
                                ({totalPnL >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%)
                            </span>
                            {totalPnL >= 0 ? (
                                <TrendingUpIcon className="ms-2" />
                            ) : (
                                <TrendingDownIcon className="ms-2" />
                            )}
                        </h3>
                    </div>
                </div>

                {/* Portfolio Allocation (Pie Chart) */}
                <div className="summary-widget-card d-flex flex-column align-items-center justify-content-center">
                    <div className="summary-widget-header w-100 align-self-start">
                        <PieChartIcon style={{ color: '#387ed1', fontSize: '18px' }} />
                        <span>Portfolio Asset Allocation</span>
                    </div>

                    {holdings.length === 0 ? (
                        <div className="text-center p-5 text-muted">
                            <AccountBalanceWalletIcon style={{ fontSize: '48px', color: '#ccc', marginBottom: '10px' }} />
                            <p className="small mb-0">No holdings yet. Search and buy stocks in the watchlist to build your portfolio!</p>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center w-100 justify-content-around mt-2">
                            <canvas ref={canvasRef} width="200" height="200" style={{ maxWidth: '170px' }} />
                            
                            <div className="d-flex flex-column gap-2" style={{ maxHeight: '180px', overflowY: 'auto', paddingRight: '5px' }}>
                                {holdings.map((h, i) => {
                                    const colors = [
                                        '#387ed1', '#4caf50', '#ff9800', '#9c27b0', '#e91e63', 
                                        '#00bcd4', '#009688', '#ffeb3b', '#795548', '#607d8b'
                                    ];
                                    const value = h.qty * h.price;
                                    const percentage = investedVal > 0 ? (value / currentVal) * 100 : 0;
                                    
                                    return (
                                        <div key={h.name} className="d-flex align-items-center gap-2" style={{ fontSize: '12px' }}>
                                            <span style={{ 
                                                display: 'inline-block', 
                                                width: '10px', 
                                                height: '10px', 
                                                borderRadius: '2px', 
                                                backgroundColor: colors[i % colors.length] 
                                            }} />
                                            <span className="fw-semibold">{h.name}:</span>
                                            <span className="text-muted">{percentage.toFixed(1)}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
