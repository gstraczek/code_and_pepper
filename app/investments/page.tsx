'use client';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import Investments from '../components/investments/investments';
import useInvestments from "../hooks/useInvestments";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

const InvestmentsPage = () => {
  const { investments, loading, error } = useInvestments();

  if(loading) return <Spinner withBg/>;
  if (error) return <div>{error}</div>;

  return (
      <Investments investments={investments} />
  );
};

export default InvestmentsPage;