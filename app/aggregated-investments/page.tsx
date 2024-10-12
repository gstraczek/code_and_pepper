'use client';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef, ColGroupDef } from 'ag-grid-community';
import React from 'react';
import useAggregatedInvestments from '../hooks/useAggregatedInvestments';
import { Spinner } from '@/components/ui/spinner';

type AggregatedInvestment = {
    totalInvestment: number;
    totalCurrentValue: number;
    totalGainLoss: number;
    }
const AggregatedInvestments = () => {
  const AggregatedInvestments = useAggregatedInvestments()
    const colDefs: (ColDef<AggregatedInvestment> | ColGroupDef<AggregatedInvestment>)[]  =[
        { field: "totalInvestment", editable: false },
        { field: "totalCurrentValue", editable: false },
        { field: "totalGainLoss", editable: false }
    ];
   if(AggregatedInvestments.loading) return <Spinner withBg/>;
   if(AggregatedInvestments.error) return <div>{AggregatedInvestments.error}</div>;
    return (
        <div
         className="ag-theme-quartz" 
         style={{ height: 500 }}
        >
            {AggregatedInvestments.aggregatedInvestments && <AgGridReact rowData={AggregatedInvestments.aggregatedInvestments} columnDefs={colDefs} />}
        
        </div>
       )
   
   }

   export default AggregatedInvestments;