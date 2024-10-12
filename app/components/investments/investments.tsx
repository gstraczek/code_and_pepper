"use client";

import { Button } from "@/components/ui/button";
import { Investment, InvestmentColDefs } from "@/types/types";
import {
  ColDef,
  ColGroupDef,
  ITooltipParams,
  GridApi,
  CellValueChangedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useRef, useMemo } from "react";
import ActionsCellRenderer from "./actions";

const colDefs: (ColDef<InvestmentColDefs> | ColGroupDef<InvestmentColDefs>)[] =
  [
    {
      field: "id",
      headerName: "ID",
      editable: false,
      minWidth: 50,
    },
    {
      field: "name",
      editable: true,
      cellClassRules: {
        "bg-red-200": (params) => !!params.data?.errors?.name,
      },
      tooltipValueGetter: (params: ITooltipParams) =>
        params.data.errors?.name || "",
      minWidth: 150,
    },
    {
      field: "quantity",
      editable: true,
      cellClassRules: {
        "bg-red-200": (params) => !!params.data?.errors?.quantity,
      },
      tooltipValueGetter: (p: ITooltipParams) => p.data.errors?.quantity || "",
      minWidth: 100,
    },
    {
      field: "buyPrice",
      editable: true,
      cellClassRules: {
        "bg-red-200": (params) => !!params.data?.errors?.buyPrice,
      },
      tooltipValueGetter: (p: ITooltipParams) => p.data.errors?.buyPrice || "",
      minWidth: 100,
    },
    {
      field: "currentPrice",
      editable: true,
      cellClassRules: {
        "bg-red-200": (params) => !!params.data?.errors?.currentPrice,
      },
      tooltipValueGetter: (p: ITooltipParams) =>
        p.data.errors?.currentPrice || "",
      minWidth: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      cellRenderer: ActionsCellRenderer, // Use the custom cell renderer
      minWidth: 200,
    },
  ];

const validateRow = (row: Investment): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  if (!row.name) errors.name = "Name is required";
  if (row.quantity <= 0) errors.quantity = "Quantity must be greater than 0";
  if (row.buyPrice <= 0) errors.buyPrice = "Buy Price must be greater than 0";
  if (row.currentPrice < 0)
    errors.currentPrice = "Current Price cannot be negative";
  return errors;
};

export default function Investments({
  investments,
}: {
  investments: Investment[];
}) {
  const [rowData, setRowData] = useState<Investment[]>(investments || []);
  const [newRowId, setNewRowId] = useState<number | undefined>();
  const [validationErrors, setValidationErrors] = useState<boolean>(false);

  const gridApiRef = useRef<GridApi | null>(null);

  const onGridReady = (params: any) => {
    gridApiRef.current = params.api;
  };

  const onCellValueChanged = (event: CellValueChangedEvent) => {
    const errors = validateRow(event.data);
    const updatedRowData = rowData.map((row) =>
      row.id === event.data.id ? { ...row, errors } : row
    );
    console.log(updatedRowData);
    setRowData(updatedRowData);
    setValidationErrors(Object.keys(errors).length > 0);
  };

  const defaultColDef = useMemo(() => {
    return {
      wrapHeaderText: true,
      resizable: true,
      sortable: true,
      filters: true,
      flex: 1,
    };
  }, []);

  const addNewRow = async () => {
    const newRow: Investment = {
      id: rowData.length + 1,
      name: "New Stock",
      quantity: 0,
      buyPrice: 0,
      currentPrice: 0,
    };
    const updatedRowData = [...rowData, newRow];
    setRowData(updatedRowData);
    setValidationErrors(true);
    setNewRowId(newRow.id);
    gridApiRef.current?.applyTransaction({ add: [newRow] });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="mb-4">
        <Button className="mr-4" onClick={addNewRow}>
          Add New Row
        </Button>
      </div>
      <div className="ag-theme-quartz">
        <AgGridReact
          animateRows={true}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
          onGridReady={onGridReady}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
}
