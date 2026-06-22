import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import toast from 'react-hot-toast';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { useAuthStore } from '../store/useAuthStore';
import { formatCurrency } from '../utils/formatters';

export default function useSocket() {
    const socketRef = useRef(null);
    const { setStocks, fetchPortfolio } = usePortfolioStore();
    const { user, isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated || !user) {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            return;
        }

        // Connect to Socket.io server
        const socket = io('http://localhost:5001', {
            transports: ['websocket'],
            withCredentials: true
        });
        socketRef.current = socket;

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        // Listen for live stock price ticks
        socket.on('stockPrices', (updatedStocks) => {
            setStocks(updatedStocks);
        });

        // Listen for background order execution events
        socket.on('orderExecuted', (data) => {
            // Check if this execution belongs to the currently logged in user
            if (data.userId === user.id || data.userId === user._id) {
                // Refresh portfolio details to sync balance and assets
                fetchPortfolio();

                // Trigger toast notification
                const priceFormatted = formatCurrency(data.price);
                if (data.status === 'COMPLETED') {
                    toast.success(
                        `Order Executed: ${data.mode} ${data.qty} shares of ${data.name} at ${priceFormatted}`,
                        { duration: 5000, position: 'bottom-right' }
                    );
                } else if (data.status === 'CANCELLED') {
                    toast.error(
                        `Order Cancelled / Failed: ${data.mode} ${data.qty} shares of ${data.name}`,
                        { duration: 5000, position: 'bottom-right' }
                    );
                }
            }
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, [isAuthenticated, user, setStocks, fetchPortfolio]);

    return socketRef.current;
}
