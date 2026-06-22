import { usePortfolioStore } from '../store/usePortfolioStore';

export default function useOrders() {
    const { placeOrder, cancelOrder, orders } = usePortfolioStore();
    return { placeOrder, cancelOrder, orders };
}
