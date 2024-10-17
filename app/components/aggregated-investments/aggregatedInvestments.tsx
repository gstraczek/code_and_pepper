"use client";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef, ColGroupDef } from "ag-grid-community";
import React, { useEffect } from "react";
import useAggregatedInvestmentsStore from "@/store/aggregatedInvestmentsStore";
import { AggregatedInvestment } from "@/types/types";

const colDefs: (
  | ColDef<AggregatedInvestment>
  | ColGroupDef<AggregatedInvestment>
)[] = [
  { field: "totalInvestment", editable: false },
  { field: "totalCurrentValue", editable: false },
  { field: "totalGainLoss", editable: false },
];
const AggregatedInvestments = ({
  initialData,
}: {
  initialData: AggregatedInvestment[];
}) => {
  const { aggregatedInvestments, setAggregatedInvestments } =
    useAggregatedInvestmentsStore();
  useEffect(() => {
    setAggregatedInvestments(initialData);
  }, [initialData, setAggregatedInvestments]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Aggregated Investments Table</h1>
      <div className="ag-theme-quartz">
        <AgGridReact
          domLayout="autoHeight"
          rowData={aggregatedInvestments}
          columnDefs={colDefs}
        />
      </div>
    </>
  );
};

export default AggregatedInvestments;
