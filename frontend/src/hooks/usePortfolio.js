import { usePortfolioStore } from '../store/usePortfolioStore';

export default function usePortfolio() {
    const { holdings, positions, orders, loading, error, fetchPortfolio, addFunds } = usePortfolioStore();
    return { holdings, positions, orders, loading, error, fetchPortfolio, addFunds };
}
