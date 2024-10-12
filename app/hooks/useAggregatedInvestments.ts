'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AggregatedInvestments } from '@/types/types';



const useAggregatedInvestments = () => {
    const [aggregatedInvestments, setAggregatedInvestments] = useState<AggregatedInvestments[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                const res = await axios.get<AggregatedInvestments[]>('/api/aggregated-investments');
                setAggregatedInvestments(res.data);
            } catch (err) {
                setError('Failed to fetch aggregated investments');
            } finally {
                setLoading(false);
            }
        };

        fetchInvestments();
    }, []);

    return { aggregatedInvestments, loading, error };
};

export default useAggregatedInvestments;