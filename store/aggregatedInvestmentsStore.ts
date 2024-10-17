import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner'
import { AggregatedInvestment } from '@/types/types';

interface InvestmentsState {
    aggregatedInvestments: AggregatedInvestment[];
    setAggregatedInvestments: (investments: AggregatedInvestment[]) => void;
}

const useAggregatedInvestmentsStore = create<InvestmentsState>((set) => ({
    aggregatedInvestments: [],
    error: null,
    chartData: { labels: [], datasets: [] },

    setAggregatedInvestments: (aggregatedInvestments: AggregatedInvestment[]) => set({
        aggregatedInvestments
    }),

}));

export default useAggregatedInvestmentsStore;