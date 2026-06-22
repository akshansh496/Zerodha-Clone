import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import api from '../services/api';
import TableSkeleton from '../components/Skeletons';

export default function TradingChart({ stockName, livePrice }) {
    const chartContainerRef = useRef(null);
    const [timeframe, setTimeframe] = useState('1D');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const seriesRef = useRef(null);
    const lastCandleRef = useRef(null);

    // Fetch historical data
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        const fetchHistory = async () => {
            try {
                const res = await api.get(`/stocks/${stockName}/candles?timeframe=${timeframe}`);
                if (isMounted) {
                    const data = res.data;
                    if (data && data.length > 0) {
                        seriesRef.current.setData(data);
                        // Save reference to the last candle so we can update it in real-time
                        lastCandleRef.current = { ...data[data.length - 1] };
                    }
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError('Failed to load chart historical data.');
                    setLoading(false);
                }
            }
        };

        // Create Chart container
        if (chartContainerRef.current) {
            chartContainerRef.current.innerHTML = '';
            
            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 350,
                layout: {
                    background: { color: '#ffffff' },
                    textColor: '#666666',
                },
                grid: {
                    vertLines: { color: '#f0f0f0' },
                    horzLines: { color: '#f0f0f0' },
                },
                crosshair: {
                    mode: 1, // CrosshairMode.Normal
                },
                rightPriceScale: {
                    borderColor: '#eeeeee',
                },
                timeScale: {
                    borderColor: '#eeeeee',
                    timeVisible: true,
                    secondsVisible: false,
                },
            });

            const candlestickSeries = chart.addCandlestickSeries({
                upColor: '#4caf50',
                downColor: '#df514c',
                borderDownColor: '#df514c',
                borderUpColor: '#4caf50',
                wickDownColor: '#df514c',
                wickUpColor: '#4caf50',
            });

            seriesRef.current = candlestickSeries;

            // Handle Resize
            const handleResize = () => {
                if (chartContainerRef.current) {
                    chart.applyOptions({ width: chartContainerRef.current.clientWidth });
                }
            };

            window.addEventListener('resize', handleResize);

            // Fetch data after chart is set up
            fetchHistory();

            return () => {
                window.removeEventListener('resize', handleResize);
                chart.remove();
                seriesRef.current = null;
                isMounted = false;
            };
        }
    }, [stockName, timeframe]);

    // Live Tick Chart Update via WebSockets
    useEffect(() => {
        if (seriesRef.current && lastCandleRef.current && livePrice) {
            const lastCandle = lastCandleRef.current;
            const updatedCandle = {
                time: lastCandle.time,
                open: lastCandle.open,
                high: Math.max(lastCandle.high, livePrice),
                low: Math.min(lastCandle.low, livePrice),
                close: livePrice
            };
            seriesRef.current.update(updatedCandle);
        }
    }, [livePrice]);

    return (
        <div className="card p-3 border-0 shadow-sm mt-3" style={{ borderRadius: '6px', border: '1px solid #eee' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0 fw-semibold">{stockName} Candlestick Chart</h6>
                
                {/* Timeframe Selectors */}
                <div className="btn-group btn-group-sm" role="group">
                    {['1D', '1W', '1M', '1Y'].map((tf) => (
                        <button
                            key={tf}
                            type="button"
                            className={`btn ${timeframe === tf ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => setTimeframe(tf)}
                            style={{ 
                                fontSize: '11px', 
                                padding: '4px 10px',
                                backgroundColor: timeframe === tf ? '#387ed1' : 'transparent',
                                borderColor: '#dcdcdc',
                                color: timeframe === tf ? '#fff' : '#666'
                            }}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>

            {loading && (
                <div className="d-flex align-items-center justify-content-center" style={{ height: '350px', backgroundColor: '#fafafa', borderRadius: '4px' }}>
                    <div className="spinner-border spinner-border-sm text-secondary" role="status">
                        <span className="visually-hidden">Loading chart...</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="d-flex align-items-center justify-content-center text-danger small" style={{ height: '350px' }}>
                    {error}
                </div>
            )}

            <div ref={chartContainerRef} style={{ width: '100%', position: 'relative', display: loading || error ? 'none' : 'block' }} />
        </div>
    );
}
