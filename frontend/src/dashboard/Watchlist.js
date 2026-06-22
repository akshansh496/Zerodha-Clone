import React, { useState, useEffect, useRef } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';

const WatchlistItem = ({ stock, index, totalItems, onBuyClick, onSellClick, onRemove, onMoveUp, onMoveDown, onSelectChart }) => {
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
        <div 
            className={`watchlist-item-row ${pulseClass}`} 
            onClick={() => onSelectChart(stock.name)}
            title="Click to view charts"
        >
            <div>
                <span className="watchlist-item-name">{stock.name}</span>
                <span className="text-muted d-block" style={{ fontSize: '10px' }}>{stock.fullName}</span>
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
            <div className="watchlist-hover-menu" onClick={(e) => e.stopPropagation()}>
                <button className="btn-watchlist-buy" onClick={() => onBuyClick(stock)}>B</button>
                <button className="btn-watchlist-sell" onClick={() => onSellClick(stock)}>S</button>
                
                {/* Reorder Buttons */}
                <button 
                    className="btn btn-light btn-sm p-0 d-flex align-items-center justify-content-center" 
                    style={{ width: '22px', height: '22px', border: '1px solid #ddd', marginRight: '4px' }}
                    onClick={() => onMoveUp(index)}
                    disabled={index === 0}
                    title="Move Up"
                >
                    <KeyboardArrowUpIcon style={{ fontSize: '16px' }} />
                </button>
                <button 
                    className="btn btn-light btn-sm p-0 d-flex align-items-center justify-content-center" 
                    style={{ width: '22px', height: '22px', border: '1px solid #ddd', marginRight: '4px' }}
                    onClick={() => onMoveDown(index)}
                    disabled={index === totalItems - 1}
                    title="Move Down"
                >
                    <KeyboardArrowDownIcon style={{ fontSize: '16px' }} />
                </button>

                {/* Remove Button */}
                <button 
                    className="btn btn-outline-danger btn-sm p-0 d-flex align-items-center justify-content-center" 
                    style={{ width: '22px', height: '22px' }}
                    onClick={() => onRemove(stock.name)}
                    title="Remove from Watchlist"
                >
                    <DeleteOutlineIcon style={{ fontSize: '14px' }} />
                </button>
            </div>
        </div>
    );
};

export default function Watchlist({ 
    stocks, 
    watchlistNames, 
    onBuyClick, 
    onSellClick, 
    onAdd, 
    onRemove, 
    onReorder,
    onSelectChart 
}) {
    const [searchTerm, setSearchTerm] = useState('');

    // Map watchlist names to actual stock data in order
    const watchlistStocks = watchlistNames
        .map(name => stocks.find(s => s.name === name))
        .filter(Boolean);

    // Filter stocks NOT in the watchlist for search results
    const nonWatchlistStocks = stocks.filter(s => !watchlistNames.includes(s.name));

    // Handle search matches
    const searchResults = searchTerm 
        ? nonWatchlistStocks.filter(s => 
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.fullName.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

    const handleMoveUp = (index) => {
        if (index === 0) return;
        const newWatchlist = [...watchlistNames];
        const temp = newWatchlist[index];
        newWatchlist[index] = newWatchlist[index - 1];
        newWatchlist[index - 1] = temp;
        onReorder(newWatchlist);
    };

    const handleMoveDown = (index) => {
        if (index === watchlistNames.length - 1) return;
        const newWatchlist = [...watchlistNames];
        const temp = newWatchlist[index];
        newWatchlist[index] = newWatchlist[index + 1];
        newWatchlist[index + 1] = temp;
        onReorder(newWatchlist);
    };

    return (
        <div className="kite-sidebar">
            {/* Search Input */}
            <div className="watchlist-search">
                <input 
                    type="text" 
                    placeholder="Search eg: infy, reliance, tcs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Search Results / Adds dropdown */}
            {searchTerm && searchResults.length > 0 && (
                <div className="bg-light border-bottom p-2" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                    <div className="text-muted small fw-bold px-2 mb-1" style={{ fontSize: '9.5px' }}>ADD TO WATCHLIST</div>
                    {searchResults.map((stock) => (
                        <div key={stock.name} className="d-flex justify-content-between align-items-center px-2 py-1 border-bottom-dashed">
                            <div>
                                <span className="small fw-semibold">{stock.name}</span>
                                <span className="text-muted small ms-2" style={{ fontSize: '10px' }}>{stock.fullName}</span>
                            </div>
                            <button 
                                className="btn btn-sm btn-primary p-0 d-flex align-items-center justify-content-center"
                                style={{ width: '20px', height: '20px', backgroundColor: '#387ed1' }}
                                onClick={() => {
                                    onAdd(stock.name);
                                    setSearchTerm(''); // Clear search after adding
                                }}
                            >
                                <AddIcon style={{ fontSize: '14px' }} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Watchlist Items */}
            <div className="watchlist-items">
                {watchlistStocks.length === 0 ? (
                    <div className="text-center p-4 text-muted small mt-5">
                        Your watchlist is empty. Search and add stocks above.
                    </div>
                ) : (
                    watchlistStocks.map((stock, idx) => (
                        <WatchlistItem 
                            key={stock.name}
                            stock={stock}
                            index={idx}
                            totalItems={watchlistStocks.length}
                            onBuyClick={onBuyClick}
                            onSellClick={onSellClick}
                            onRemove={onRemove}
                            onMoveUp={handleMoveUp}
                            onMoveDown={handleMoveDown}
                            onSelectChart={onSelectChart}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
