import { usePortfolioStore } from '../store/usePortfolioStore';

export default function useStocks() {
    const { stocks, fetchStocks } = usePortfolioStore();
    return { stocks, fetchStocks };
}
