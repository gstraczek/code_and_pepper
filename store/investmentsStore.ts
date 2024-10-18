import { create } from 'zustand';
import axios from 'axios';
import { Investment } from '@prisma/client';
import { toast } from 'sonner'

interface InvestmentsState {
    investments: Investment[];
    loading: boolean;
    error: string | null;
    chartData: { labels: string[]; currPriceDatasets: number[], buyPriceDatasets: number[] };
    updateInvestment: (investment: Investment) => Promise<void>;
    saveInvestment: (investment: Investment) => Promise<void>;
    removeInvestment: (id: Number) => Promise<void>;
    updateChartData: () => void;
    setInvestments: (investments: Investment[]) => void;
}

const useInvestmentsStore = create<InvestmentsState>((set, get) => ({
    investments: [],
    loading: false,
    error: null,
    chartData: { labels: [], currPriceDatasets: [], buyPriceDatasets: [] },
    updateInvestment: async (investment: Investment) => {
        await axios.put(`/api/investments/${investment.id}`, investment);
        set((state) => ({
            investments: state.investments.map((inv) =>
                inv.id === investment.id ? investment : inv
            ),
        }));
    },
    saveInvestment: async (investment: Investment) => {
        const { data: inv } = await axios.post('/api/investments', investment);
        set((state) => ({ investments: [...state.investments, inv] }));
    },
    removeInvestment: async (id) => {
        await axios.delete(`/api/investments/${id}`);
        set((state) => ({
            investments: state.investments.filter((inv) => inv.id !== id),
        }));
    },
    updateChartData: () => {
        const investments = get().investments
        const labels = investments.map((investment) => investment.name);
        const currPriceDatasets = investments.map((investment) => investment.currentPrice);
        const buyPriceDatasets = investments.map((investment) => investment.buyPrice);
        set({ chartData: { labels, currPriceDatasets, buyPriceDatasets } });
    },
    setInvestments: (investments: Investment[]) => set({
        investments
    }),

}));

export default useInvestmentsStore;