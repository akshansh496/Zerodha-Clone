import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
    BarChart, Bar, Legend, PieChart, Pie, Cell 
} from 'recharts';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { formatCurrency } from '../utils/formatters';

export default function Analytics(props) {
    const context = useOutletContext();
    const user = context?.user || props.user;
    const holdings = context?.holdings || props.holdings || [];

    const investedVal = holdings.reduce((sum, h) => sum + (h.qty * h.avgPrice), 0);
    const currentVal = holdings.reduce((sum, h) => sum + (h.qty * h.price), 0);
    const totalPnL = currentVal - investedVal;
    const pnlPercent = investedVal > 0 ? (totalPnL / investedVal) * 100 : 0;

    // Data for cost vs current comparison (Bar Chart)
    const barData = holdings.map(h => ({
        name: h.name,
        Invested: parseFloat((h.qty * h.avgPrice).toFixed(2)),
        Current: parseFloat((h.qty * h.price).toFixed(2))
    }));

    // Data for portfolio asset allocation (Pie Chart)
    const pieData = holdings.map(h => ({
        name: h.name,
        value: parseFloat((h.qty * h.price).toFixed(2))
    }));

    const COLORS = [
        '#387ed1', '#4caf50', '#ff9800', '#9c27b0', '#e91e63', 
        '#00bcd4', '#009688', '#ffeb3b', '#795548', '#607d8b'
    ];

    // Simulated historical growth curve (Area Chart - last 30 days)
    const generateGrowthData = () => {
        if (holdings.length === 0) return [];
        
        const data = [];
        const today = new Date();
        
        let currentDayValue = investedVal;
        const dailyIncrement = (currentVal - investedVal) / 30;

        for (let i = 30; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });

            const wiggle = (Math.random() * 4 - 2) / 100 * investedVal;
            currentDayValue += dailyIncrement + wiggle;
            if (currentDayValue < 0) currentDayValue = 0;

            const finalVal = i === 0 ? currentVal : parseFloat(currentDayValue.toFixed(2));

            data.push({
                date: dateStr,
                Value: finalVal
            });
        }
        return data;
    };

    const growthData = generateGrowthData();

    return (
        <div>
            <div className="workspace-title">
                <span>Portfolio Analytics</span>
            </div>

            {holdings.length === 0 ? (
                <div className="text-center p-5 border rounded bg-white text-muted mt-4">
                    <AccountBalanceWalletIcon style={{ fontSize: '48px', color: '#ccc', marginBottom: '10px' }} />
                    <p className="mb-0 fs-6">No assets to analyze yet.</p>
                    <p className="small text-muted mt-1">Holdings analysis will automatically populate once you buy stocks.</p>
                </div>
            ) : (
                <div className="d-flex flex-column gap-4">
                    
                    {/* Growth Curve */}
                    <div className="card p-4 border-0 shadow-sm" style={{ borderRadius: '6px', border: '1px solid #eee' }}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <ShowChartIcon style={{ color: '#ff5722', fontSize: '20px' }} />
                            <h6 className="mb-0 fw-semibold">Estimated Portfolio Growth (Last 30 Days)</h6>
                        </div>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer>
                                <AreaChart data={growthData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ff5722" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#ff5722" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="date" stroke="#999" fontSize={11} tickLine={false} />
                                    <YAxis 
                                        stroke="#999" 
                                        fontSize={11} 
                                        tickLine={false} 
                                        tickFormatter={(v) => `₹${v >= 1000 ? (v/1000).toFixed(1)+'k' : v}`}
                                    />
                                    <Tooltip formatter={(value) => [formatCurrency(value), 'Portfolio Value']} />
                                    <Area type="monotone" dataKey="Value" stroke="#ff5722" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="row g-4">
                        {/* Cost vs Value Comparison */}
                        <div className="col-lg-7">
                            <div className="card p-4 border-0 shadow-sm h-100" style={{ borderRadius: '6px', border: '1px solid #eee' }}>
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <AssessmentIcon style={{ color: '#387ed1', fontSize: '20px' }} />
                                    <h6 className="mb-0 fw-semibold">Invested Value vs. Current Market Value</h6>
                                </div>
                                <div style={{ width: '100%', height: 280 }}>
                                    <ResponsiveContainer>
                                        <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                            <XAxis dataKey="name" stroke="#999" fontSize={11} tickLine={false} />
                                            <YAxis stroke="#999" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v}`} />
                                            <Tooltip formatter={(value) => formatCurrency(value)} />
                                            <Legend wrapperStyle={{ fontSize: '11px' }} />
                                            <Bar dataKey="Invested" fill="#cbd4e1" radius={[3, 3, 0, 0]} />
                                            <Bar dataKey="Current" fill="#387ed1" radius={[3, 3, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Distribution Allocation */}
                        <div className="col-lg-5">
                            <div className="card p-4 border-0 shadow-sm h-100" style={{ borderRadius: '6px', border: '1px solid #eee' }}>
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <DonutLargeIcon style={{ color: '#4caf50', fontSize: '20px' }} />
                                    <h6 className="mb-0 fw-semibold">Holding Allocations</h6>
                                </div>
                                <div className="d-flex flex-column align-items-center justify-content-center h-100">
                                    <div style={{ width: '100%', height: 200, position: 'relative' }}>
                                        <ResponsiveContainer>
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={55}
                                                    outerRadius={80}
                                                    paddingAngle={3}
                                                    dataKey="value"
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => formatCurrency(value)} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="d-flex flex-wrap gap-2 justify-content-center mt-3" style={{ fontSize: '11px' }}>
                                        {pieData.map((entry, index) => (
                                            <div key={entry.name} className="d-flex align-items-center gap-1">
                                                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length] }}></span>
                                                <span className="fw-medium">{entry.name}:</span>
                                                <span className="text-muted">{((entry.value / currentVal) * 100).toFixed(1)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
