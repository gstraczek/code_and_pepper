'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Investment } from '@/types/types';

const useInvestments = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const res = await axios.get<Investment[]>('/api/investments');
        setInvestments(res.data);
      } catch (err) {
        setError('Failed to fetch investments');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  const deleteInvestment = async (id: number) => {
    await axios.delete(`/api/investments/${id}`);
    setInvestments((prev) => prev.filter((investment) => investment.id !== id));
  }

  const saveInvestment = async (investment: Investment) => {
    await axios.post('/api/investments', investment);
    setInvestments((prev) => [...prev, investment]);
  }

  return { deleteInvestment, saveInvestment, investments, loading, error };
};

export default useInvestments;