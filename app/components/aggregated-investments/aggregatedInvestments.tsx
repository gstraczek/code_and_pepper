"use client";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef, ColGroupDef } from "ag-grid-community";
import useAggregatedInvestments from "../../hooks/useAggregatedInvestments";

type AggregatedInvestment = {
  totalInvestment: number;
  totalCurrentValue: number;
  totalGainLoss: number;
};
const AggregatedInvestments = () => {
  const AggregatedInvestments = useAggregatedInvestments();
  const colDefs: (
    | ColDef<AggregatedInvestment>
    | ColGroupDef<AggregatedInvestment>
  )[] = [
    { field: "totalInvestment", editable: false },
    { field: "totalCurrentValue", editable: false },
    { field: "totalGainLoss", editable: false },
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="ag-theme-quartz ">
        {AggregatedInvestments.loading && <p>Loading...</p>}
        {AggregatedInvestments.error && (
          <p style={{ color: "red" }}>{AggregatedInvestments.error}</p>
        )}
        {AggregatedInvestments.aggregatedInvestments && (
          <AgGridReact
            rowData={AggregatedInvestments.aggregatedInvestments}
            columnDefs={colDefs}
            domLayout="autoHeight"
          />
        )}
      </div>
    </div>
  );
};

export default AggregatedInvestments;
