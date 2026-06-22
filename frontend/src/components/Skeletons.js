import React from 'react';

export function TableSkeleton({ rows = 5, cols = 5 }) {
    return (
        <div style={{ width: '100%' }}>
            {/* Header Skeleton */}
            <div className="d-flex gap-3 mb-3 pb-2 border-bottom">
                {[...Array(cols)].map((_, i) => (
                    <div 
                        key={i} 
                        className="bg-light" 
                        style={{ height: '16px', flex: 1, borderRadius: '3px', opacity: 0.7 }}
                    />
                ))}
            </div>
            
            {/* Body Skeletons */}
            {[...Array(rows)].map((_, rIndex) => (
                <div key={rIndex} className="d-flex gap-3 mb-3">
                    {[...Array(cols)].map((_, cIndex) => (
                        <div 
                            key={cIndex} 
                            className="bg-light" 
                            style={{ 
                                height: '22px', 
                                flex: 1, 
                                borderRadius: '3px',
                                animation: 'pulse 1.5s infinite ease-in-out',
                                animationDelay: `${rIndex * 0.1}s`
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="card p-4 border-0 shadow-sm w-100" style={{ borderRadius: '6px', border: '1px solid #eee', minHeight: '200px' }}>
            <div className="bg-light mb-4" style={{ height: '24px', width: '40%', borderRadius: '3px', animation: 'pulse 1.5s infinite ease-in-out' }} />
            <div className="bg-light mb-3" style={{ height: '36px', width: '80%', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
            <div className="bg-light mt-4" style={{ height: '16px', width: '60%', borderRadius: '3px', animation: 'pulse 1.5s infinite ease-in-out' }} />
        </div>
    );
}

export function WatchlistSkeleton({ count = 8 }) {
    return (
        <div className="d-flex flex-column gap-1 w-100">
            {[...Array(count)].map((_, i) => (
                <div 
                    key={i} 
                    className="d-flex justify-content-between align-items-center p-3 border-bottom"
                    style={{ height: '52px' }}
                >
                    <div className="d-flex flex-column gap-2" style={{ width: '40%' }}>
                        <div className="bg-light" style={{ height: '14px', width: '80%', borderRadius: '3px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                        <div className="bg-light" style={{ height: '10px', width: '50%', borderRadius: '2px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                    </div>
                    <div className="d-flex flex-column align-items-end gap-2" style={{ width: '25%' }}>
                        <div className="bg-light" style={{ height: '14px', width: '100%', borderRadius: '3px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                        <div className="bg-light" style={{ height: '10px', width: '70%', borderRadius: '2px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                    </div>
                </div>
            ))}
        </div>
    );
}

// Add global CSS keyframes for pulse animation if they aren't loaded
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 0.3; }
    100% { opacity: 0.6; }
}
`;
document.head.appendChild(style);
