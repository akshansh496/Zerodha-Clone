import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Watchlist from './Watchlist';
import Summary from './Summary';
import Holdings from './Holdings';
import Positions from './Positions';
import Orders from './Orders';
import Funds from './Funds';
import BuySellModal from './BuySellModal';
import './dashboard.css';

export default function Dashboard() {
    const { user, isAuthenticated, loading, logout, refreshProfile } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, orders, holdings, positions, funds
    const [stocks, setStocks] = useState([]);
    const [holdings, setHoldings] = useState([]);
    const [positions, setPositions] = useState([]);
    const [orders, setOrders] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('BUY'); // BUY or SELL
    const [selectedStock, setSelectedStock] = useState(null);

    const API_URL = 'http://localhost:5001/api';

    // 1. Authenticate check
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, loading, navigate]);

    // 2. Fetch market stocks (polling every 2.5s)
    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchStocks = async () => {
            try {
                const res = await fetch(`${API_URL}/stocks`);
                if (res.ok) {
                    const data = await res.json();
                    setStocks(data);
                }
            } catch (err) {
                console.error('Error fetching stocks:', err);
            }
        };

        fetchStocks();
        const interval = setInterval(fetchStocks, 2500);
        return () => clearInterval(interval);
    }, [isAuthenticated]);

    // 3. Fetch holdings, positions, orders, and funds (polling every 3s to reflect limit executions)
    const fetchUserData = async () => {
        if (!isAuthenticated) return;
        const token = localStorage.getItem('token');
        if (!token) return;

        const headers = { 'Authorization': `Bearer ${token}` };

        try {
            // Fetch Holdings
            const holdingsRes = await fetch(`${API_URL}/holdings`, { headers });
            if (holdingsRes.ok) setHoldings(await holdingsRes.json());

            // Fetch Positions
            const positionsRes = await fetch(`${API_URL}/positions`, { headers });
            if (positionsRes.ok) setPositions(await positionsRes.json());

            // Fetch Orders
            const ordersRes = await fetch(`${API_URL}/orders`, { headers });
            if (ordersRes.ok) setOrders(await ordersRes.json());

            // Refresh user profile balance
            refreshProfile();
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserData();
            const interval = setInterval(fetchUserData, 3000);
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading dashboard...</span>
                </div>
            </div>
        );
    }

    if (!user) return null;

    // Index calculation helpers (tied to watchlist ticks)
    const getNiftyIndex = () => {
        const infy = stocks.find(s => s.name === 'INFY')?.price || 1425;
        const reliance = stocks.find(s => s.name === 'RELIANCE')?.price || 2450;
        const tcs = stocks.find(s => s.name === 'TCS')?.price || 3210;
        const hdfc = stocks.find(s => s.name === 'HDFCBANK')?.price || 1550;
        
        const sum = infy + reliance + tcs + hdfc;
        const base = 22420.50 + (sum - 8635) * 0.8;
        const change = (sum - 8635) * 0.8;
        const pct = (change / 22420.50) * 100;
        return {
            value: base.toFixed(2),
            change: change.toFixed(2),
            percent: pct.toFixed(2),
            isDown: change < 0
        };
    };

    const getSensexIndex = () => {
        const infy = stocks.find(s => s.name === 'INFY')?.price || 1425;
        const reliance = stocks.find(s => s.name === 'RELIANCE')?.price || 2450;
        const tcs = stocks.find(s => s.name === 'TCS')?.price || 3210;
        const hdfc = stocks.find(s => s.name === 'HDFCBANK')?.price || 1550;

        const sum = infy + reliance + tcs + hdfc;
        const base = 73850.80 + (sum - 8635) * 2.6;
        const change = (sum - 8635) * 2.6;
        const pct = (change / 73850.80) * 100;
        return {
            value: base.toFixed(2),
            change: change.toFixed(2),
            percent: pct.toFixed(2),
            isDown: change < 0
        };
    };

    const nifty = getNiftyIndex();
    const sensex = getSensexIndex();

    // Event Handlers
    const handleBuyClick = (stock) => {
        setSelectedStock(stock);
        setModalMode('BUY');
        setModalOpen(true);
    };

    const handleSellClick = (stock) => {
        setSelectedStock(stock);
        setModalMode('SELL');
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedStock(null);
    };

    const handleSubmitOrder = async (orderData) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to submit order');
            }
            // Trigger refresh
            fetchUserData();
        } catch (err) {
            throw err;
        }
    };

    const handleCancelOrder = async (orderId) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_URL}/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to cancel order');
            }
            fetchUserData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleAddFunds = async (amount) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_URL}/funds/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to add funds');
            }
            fetchUserData();
        } catch (err) {
            throw err;
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="kite-dashboard">
            {/* Top Header */}
            <header className="kite-header">
                {/* Indices summary on left */}
                <div className="d-flex align-items-center gap-4">
                    <div className="kite-logo">
                        <img src="/media/logo.svg" alt="Zerodha Logo" />
                    </div>
                    
                    <div className="d-flex align-items-center gap-3 border-start ps-3" style={{ fontSize: '11.5px' }}>
                        <div>
                            <span className="text-muted fw-medium me-1">NIFTY 50</span>
                            <span className={`fw-semibold ${nifty.isDown ? 'text-down' : 'text-up'}`}>{nifty.value}</span>
                            <span className={`ms-1 small ${nifty.isDown ? 'text-down' : 'text-up'}`}>
                                {nifty.change} ({nifty.percent}%)
                            </span>
                        </div>
                        <div>
                            <span className="text-muted fw-medium me-1">SENSEX</span>
                            <span className={`fw-semibold ${sensex.isDown ? 'text-down' : 'text-up'}`}>{sensex.value}</span>
                            <span className={`ms-1 small ${sensex.isDown ? 'text-down' : 'text-up'}`}>
                                {sensex.change} ({sensex.percent}%)
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tabs Menu in Middle */}
                <ul className="kite-nav-links">
                    <li 
                        className={`kite-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        Dashboard
                    </li>
                    <li 
                        className={`kite-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Orders
                    </li>
                    <li 
                        className={`kite-nav-item ${activeTab === 'holdings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('holdings')}
                    >
                        Holdings
                    </li>
                    <li 
                        className={`kite-nav-item ${activeTab === 'positions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('positions')}
                    >
                        Positions
                    </li>
                    <li 
                        className={`kite-nav-item ${activeTab === 'funds' ? 'active' : ''}`}
                        onClick={() => setActiveTab('funds')}
                    >
                        Funds
                    </li>
                </ul>

                {/* Profile actions on right */}
                <div className="kite-user-profile">
                    <div className="kite-user-avatar">
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="fw-semibold text-uppercase">{user.username}</span>
                    <span className="text-muted">|</span>
                    <button className="btn btn-link btn-sm text-decoration-none text-muted p-0" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            {/* Layout Workspace */}
            <div className="kite-main-container">
                {/* Watchlist Sidebar */}
                <Watchlist 
                    stocks={stocks} 
                    onBuyClick={handleBuyClick} 
                    onSellClick={handleSellClick} 
                />

                {/* Workspaces Main Tabs */}
                <main className="kite-workspace">
                    {activeTab === 'dashboard' && (
                        <Summary user={user} holdings={holdings} />
                    )}
                    {activeTab === 'orders' && (
                        <Orders orders={orders} onCancelOrder={handleCancelOrder} />
                    )}
                    {activeTab === 'holdings' && (
                        <Holdings holdings={holdings} />
                    )}
                    {activeTab === 'positions' && (
                        <Positions positions={positions} />
                    )}
                    {activeTab === 'funds' && (
                        <Funds user={user} onAddFunds={handleAddFunds} />
                    )}
                </main>
            </div>

            {/* Buy / Sell Floating Modal popup */}
            {modalOpen && selectedStock && (
                <BuySellModal 
                    activeStock={stocks.find(s => s.name === selectedStock.name) || selectedStock}
                    mode={modalMode}
                    onClose={handleCloseModal}
                    onSubmitOrder={handleSubmitOrder}
                />
            )}
        </div>
    );
}
