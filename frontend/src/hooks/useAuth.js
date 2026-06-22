import { useAuthStore } from '../store/useAuthStore';

export default function useAuth() {
    const { user, isAuthenticated, loading, error, login, signup, logout, checkAuth, refreshUser } = useAuthStore();
    return { user, isAuthenticated, loading, error, login, signup, logout, checkAuth, refreshUser };
}
