import { usePortfolioStore } from '../store/usePortfolioStore';

export default function useWatchlist() {
    const { watchlist, fetchWatchlist, addWatchlist, removeWatchlist, saveReorderedWatchlist } = usePortfolioStore();
    return { watchlist, fetchWatchlist, addWatchlist, removeWatchlist, saveReorderedWatchlist };
}
