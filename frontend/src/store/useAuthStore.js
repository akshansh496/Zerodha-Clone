import { create } from 'zustand';
import api from '../services/api';

export const useAuthStore = create((set, get) => ({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,

    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            set({ user: null, isAuthenticated: false, loading: false });
            return;
        }

        try {
            const res = await api.get('/auth/profile');
            set({ user: res.data, isAuthenticated: true, loading: false, error: null });
        } catch (err) {
            localStorage.removeItem('token');
            set({ user: null, isAuthenticated: false, loading: false });
        }
    },

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const res = await api.post('/auth/login', { email, password });
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            set({ user, isAuthenticated: true, loading: false, error: null });
            return user;
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed. Please verify credentials.';
            set({ loading: false, error: msg });
            throw new Error(msg);
        }
    },

    signup: async (username, email, password) => {
        set({ loading: true, error: null });
        try {
            const res = await api.post('/auth/signup', { username, email, password });
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            set({ user, isAuthenticated: true, loading: false, error: null });
            return user;
        } catch (err) {
            const msg = err.response?.data?.message || 'Signup failed. Please try again.';
            set({ loading: false, error: msg });
            throw new Error(msg);
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false, error: null });
    },

    refreshUser: async () => {
        try {
            const res = await api.get('/auth/profile');
            set({ user: res.data });
        } catch (err) {
            console.error('Error refreshing user profile:', err);
        }
    }
}));
