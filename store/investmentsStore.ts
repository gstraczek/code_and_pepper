import { create } from 'zustand';
import axios from 'axios';
import { Investment } from '@/types/types';

interface InvestmentsState {
    investments: Investment[];
    loading: boolean;
    error: string | null;
    chartData: { labels: string[]; datasets: number[] };
    fetchInvestments: () => Promise<void>;
    updateInvestment: (investment: Investment) => Promise<void>;
    saveInvestment: (investment: Investment) => Promise<Investment>;
    removeInvestment: (id: String) => Promise<void>;
    updateChartData: () => void;
}

const useInvestmentsStore = create<InvestmentsState>((set, get) => ({
    investments: [],
    loading: false,
    error: null,
    chartData: { labels: [], datasets: [] },
    fetchInvestments: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get<Investment[]>('/api/investments');
            set({ investments: response.data, loading: false });
        } catch (error) {
            set({ error: 'Failed to fetch investments', loading: false });
        }
    },
    updateInvestment: async (investment: Investment) => {
        await axios.put(`/api/investments/${investment.id}`, investment);
        set((state) => ({
            investments: state.investments.map((inv) =>
                inv.id === investment.id ? investment : inv
            ),
        }));
    },
    saveInvestment: async (investment: Investment) => {
        const res = await axios.post('/api/investments', investment);
        set((state) => ({ investments: [...state.investments, investment] }));
        return res.data;
    },
    removeInvestment: async (id: String) => {
        await axios.delete(`/api/investments/${id}`);
        set((state) => ({
            investments: state.investments.filter((inv) => inv.id !== id),
        }));
    },
    updateChartData: () => {
        const investments = get().investments
        const labels = investments.map((investment) => investment.name);
        const datasets = investments.map((investment) => investment.currentPrice);
        set({ chartData: { labels, datasets } });
    },
}));

export default useInvestmentsStore;