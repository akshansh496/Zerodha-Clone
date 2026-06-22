import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import usePortfolio from '../hooks/usePortfolio';
import useOrders from '../hooks/useOrders';
import useStocks from '../hooks/useStocks';
import useWatchlist from '../hooks/useWatchlist';
import useSocket from '../hooks/useSocket';
import Watchlist from './Watchlist';
import BuySellModal from './BuySellModal';
import TradingChart from './TradingChart';
import { WatchlistSkeleton } from '../components/Skeletons';

export default function Dashboard() {
    const navigate = useNavigate();
    
    // 1. Hook up global Zustand state via hooks
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const { holdings, positions, orders, fetchPortfolio, addFunds } = usePortfolio();
    const { placeOrder, cancelOrder } = useOrders();
    const { stocks, fetchStocks } = useStocks();
    const { watchlist, fetchWatchlist, addWatchlist, removeWatchlist, saveReorderedWatchlist } = useWatchlist();

    // 2. Initialize real-time WebSockets
    useSocket();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('BUY'); // BUY or SELL
    const [selectedStock, setSelectedStock] = useState(null);
    const [selectedStockForChart, setSelectedStockForChart] = useState(null);

    // Fetch initial user settings
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/login');
            return;
        }

        if (isAuthenticated) {
            fetchStocks();
            fetchWatchlist();
            fetchPortfolio();
        }
    }, [isAuthenticated, authLoading, navigate, fetchStocks, fetchWatchlist, fetchPortfolio]);

    if (authLoading) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading dashboard...</span>
                </div>
            </div>
        );
    }

    if (!user) return null;

    // Index calculation helpers (tied to dynamic socket ticks)
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

    const handleSelectChart = (stockName) => {
        setSelectedStockForChart(stockName);
    };

    return (
        <div className="kite-dashboard">
            {/* Top Header */}
            <header className="kite-header">
                <div className="d-flex align-items-center gap-4">
                    <div className="kite-logo">
                        <img src="/media/logo.svg" alt="Zerodha Logo" />
                    </div>
                    
                    <div className="d-flex align-items-center gap-3 border-start ps-3" style={{ fontSize: '11px' }}>
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

                {/* Sub-routing NavLink Tabs */}
                <ul className="kite-nav-links">
                    <NavLink 
                        to="/dashboard" 
                        end
                        className={({ isActive }) => `kite-nav-item text-decoration-none ${isActive ? 'active' : ''}`}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink 
                        to="/dashboard/orders" 
                        className={({ isActive }) => `kite-nav-item text-decoration-none ${isActive ? 'active' : ''}`}
                    >
                        Orders
                    </NavLink>
                    <NavLink 
                        to="/dashboard/holdings" 
                        className={({ isActive }) => `kite-nav-item text-decoration-none ${isActive ? 'active' : ''}`}
                    >
                        Holdings
                    </NavLink>
                    <NavLink 
                        to="/dashboard/positions" 
                        className={({ isActive }) => `kite-nav-item text-decoration-none ${isActive ? 'active' : ''}`}
                    >
                        Positions
                    </NavLink>
                    <NavLink 
                        to="/dashboard/funds" 
                        className={({ isActive }) => `kite-nav-item text-decoration-none ${isActive ? 'active' : ''}`}
                    >
                        Funds
                    </NavLink>
                    <NavLink 
                        to="/dashboard/analytics" 
                        className={({ isActive }) => `kite-nav-item text-decoration-none ${isActive ? 'active' : ''}`}
                    >
                        Analytics
                    </NavLink>
                </ul>

                {/* User Profile Info */}
                <div className="kite-user-profile">
                    <div className="kite-user-avatar">
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="fw-semibold text-uppercase">{user.username}</span>
                </div>
            </header>

            {/* Main Layout Container */}
            <div className="kite-main-container">
                {/* Watchlist Sidebar */}
                {stocks.length === 0 ? (
                    <div className="kite-sidebar">
                        <WatchlistSkeleton />
                    </div>
                ) : (
                    <Watchlist 
                        stocks={stocks} 
                        watchlistNames={watchlist}
                        onBuyClick={handleBuyClick} 
                        onSellClick={handleSellClick} 
                        onAdd={addWatchlist}
                        onRemove={removeWatchlist}
                        onReorder={saveReorderedWatchlist}
                        onSelectChart={handleSelectChart}
                    />
                )}

                {/* Workspace area rendering sub-routes and charts */}
                <main className="kite-workspace">
                    {/* Sliding stock chart panel */}
                    {selectedStockForChart && (
                        <div className="mb-4 animate-fadeIn">
                            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                                <h5 className="mb-0 fw-semibold text-primary">{selectedStockForChart} Analysis</h5>
                                <button 
                                    className="btn btn-sm btn-outline-secondary py-0 px-2 fw-medium" 
                                    style={{ fontSize: '11px' }}
                                    onClick={() => setSelectedStockForChart(null)}
                                >
                                    Close Chart
                                </button>
                            </div>
                            <TradingChart 
                                stockName={selectedStockForChart} 
                                livePrice={stocks.find(s => s.name === selectedStockForChart)?.price} 
                            />
                        </div>
                    )}
                    
                    {/* Render active nested subroute (Summary, Holdings, Orders, etc.) */}
                    <Outlet context={{ 
                        user, 
                        holdings, 
                        positions, 
                        orders, 
                        stocks, 
                        onSubmitOrder: placeOrder, 
                        onCancelOrder: cancelOrder, 
                        onAddFunds: addFunds 
                    }} />
                </main>
            </div>

            {/* Buy/Sell Modal popup */}
            {modalOpen && selectedStock && (
                <BuySellModal 
                    activeStock={stocks.find(s => s.name === selectedStock.name) || selectedStock}
                    mode={modalMode}
                    onClose={handleCloseModal}
                    onSubmitOrder={placeOrder}
                />
            )}
        </div>
    );
}
