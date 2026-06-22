import { create } from 'zustand';
import api from '../services/api';
import { useAuthStore } from './useAuthStore';

export const usePortfolioStore = create((set, get) => ({
    stocks: [],
    holdings: [],
    positions: [],
    orders: [],
    watchlist: [],
    loading: false,
    error: null,

    setStocks: (stocks) => set({ stocks }),
    setHoldings: (holdings) => set({ holdings }),
    setPositions: (positions) => set({ positions }),
    setOrders: (orders) => set({ orders }),
    setWatchlist: (watchlist) => set({ watchlist }),

    fetchStocks: async () => {
        try {
            const res = await api.get('/stocks');
            set({ stocks: res.data });
        } catch (err) {
            console.error('Error fetching stocks:', err);
        }
    },

    fetchWatchlist: async () => {
        try {
            const res = await api.get('/watchlist');
            set({ watchlist: res.data });
        } catch (err) {
            console.error('Error fetching watchlist:', err);
        }
    },

    fetchPortfolio: async () => {
        set({ loading: true });
        try {
            const [holdingsRes, positionsRes, ordersRes] = await Promise.all([
                api.get('/holdings'),
                api.get('/positions'),
                api.get('/orders')
            ]);
            set({
                holdings: holdingsRes.data,
                positions: positionsRes.data,
                orders: ordersRes.data,
                loading: false,
                error: null
            });
            // Refresh user profile balance
            useAuthStore.getState().refreshUser();
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || 'Error fetching portfolio details'
            });
        }
    },

    placeOrder: async (orderData) => {
        try {
            const res = await api.post('/orders', orderData);
            // Refresh portfolio and orders immediately
            get().fetchPortfolio();
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || 'Order submission failed';
            throw new Error(msg);
        }
    },

    cancelOrder: async (orderId) => {
        try {
            const res = await api.delete(`/orders/${orderId}`);
            get().fetchPortfolio();
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to cancel order';
            throw new Error(msg);
        }
    },

    addWatchlist: async (stockName) => {
        try {
            const res = await api.post('/watchlist', { name: stockName });
            set({ watchlist: res.data });
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to add to watchlist';
            throw new Error(msg);
        }
    },

    removeWatchlist: async (stockName) => {
        try {
            const res = await api.delete(`/watchlist/${stockName}`);
            set({ watchlist: res.data });
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to remove from watchlist';
            throw new Error(msg);
        }
    },

    saveReorderedWatchlist: async (newWatchlist) => {
        try {
            const res = await api.put('/watchlist', { watchlist: newWatchlist });
            set({ watchlist: res.data });
        } catch (err) {
            console.error('Failed to save reordered watchlist:', err);
        }
    },

    addFunds: async (amount) => {
        try {
            const res = await api.post('/funds/add', { amount });
            useAuthStore.getState().refreshUser();
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to deposit funds';
            throw new Error(msg);
        }
    }
}));
