import React, { useState, useEffect, useRef } from 'react';

// Wrapper component to detect price updates and flash green/red
const WatchlistItem = ({ stock, onBuyClick, onSellClick }) => {
    const [pulseClass, setPulseClass] = useState('');
    const prevPriceRef = useRef(stock.price);

    useEffect(() => {
        if (stock.price > prevPriceRef.current) {
            setPulseClass('price-pulse-up');
            const timer = setTimeout(() => setPulseClass(''), 800);
            prevPriceRef.current = stock.price;
            return () => clearTimeout(timer);
        } else if (stock.price < prevPriceRef.current) {
            setPulseClass('price-pulse-down');
            const timer = setTimeout(() => setPulseClass(''), 800);
            prevPriceRef.current = stock.price;
            return () => clearTimeout(timer);
        }
    }, [stock.price]);

    return (
        <div className={`watchlist-item-row ${pulseClass}`}>
            <div>
                <span className="watchlist-item-name">{stock.name}</span>
                <span className="text-muted d-block" style={{ fontSize: '10.5px' }}>{stock.fullName}</span>
            </div>
            
            <div className="watchlist-item-prices">
                <span className={`watchlist-price-ltp ${parseFloat(stock.change) >= 0 ? 'text-up' : 'text-down'}`}>
                    {stock.price.toFixed(2)}
                </span>
                <span className={`watchlist-price-pct ${parseFloat(stock.change) >= 0 ? 'text-up' : 'text-down'}`}>
                    {parseFloat(stock.change) >= 0 ? '+' : ''}{stock.percent}%
                </span>
            </div>

            {/* Hover Actions Menu */}
            <div className="watchlist-hover-menu">
                <button className="btn-watchlist-buy" onClick={() => onBuyClick(stock)}>
                    B
                </button>
                <button className="btn-watchlist-sell" onClick={() => onSellClick(stock)}>
                    S
                </button>
            </div>
        </div>
    );
};

export default function Watchlist({ stocks, onBuyClick, onSellClick }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStocks = stocks.filter(stock => 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="kite-sidebar">
            <div className="watchlist-search">
                <input 
                    type="text" 
                    placeholder="Search eg: infy, bse, nifty"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="watchlist-items">
                {filteredStocks.length === 0 ? (
                    <div className="text-center p-4 text-muted small">
                        No stocks match your search.
                    </div>
                ) : (
                    filteredStocks.map((stock) => (
                        <WatchlistItem 
                            key={stock.name}
                            stock={stock}
                            onBuyClick={onBuyClick}
                            onSellClick={onSellClick}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
