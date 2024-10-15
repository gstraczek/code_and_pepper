"use client";

import { Button } from "@/components/ui/button";
import { InvestmentColDefs, newInvestment } from "@/types/types";
import {
  ColDef,
  ColGroupDef,
  ITooltipParams,
  GridApi,
  CellValueChangedEvent,
  CsvExportParams,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import ActionsCellRenderer from "./actions";
import useInvestmentsStore from "@/store/investmentsStore";
import exportToExcel from "@/lib/xlsx";
import { Investment } from "@prisma/client";

const colDefs: (ColDef<InvestmentColDefs> | ColGroupDef<InvestmentColDefs>)[] =
  [
    {
      field: "id",
      headerName: "ID",
      valueGetter: (params) => (params.node ? params.node.rowIndex! + 1 : null),
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
      cellRenderer: ActionsCellRenderer,
      minWidth: 50,
    },
  ];

const validateRow = (row: Partial<Investment>): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  if (!row.name) errors.name = "Name is required";
  if (!row.quantity || row.quantity <= 0)
    errors.quantity = "Quantity must be greater than 0";
  if (!row.buyPrice || row.buyPrice <= 0)
    errors.buyPrice = "Buy Price must be greater than 0";
  if (!row.currentPrice || row.currentPrice < 0)
    errors.currentPrice = "Current Price cannot be negative";
  return errors;
};

export default function Investments() {
  const {
    fetchInvestments,
    updateInvestment,
    saveInvestment,
    updateChartData,
    investments,
  } = useInvestmentsStore();

  const [rowData, setRowData] = useState<Partial<newInvestment>[]>(
    investments || []
  );
  useEffect(() => {
    const fetchData = async () => {
      await fetchInvestments();
      setRowData(useInvestmentsStore.getState().investments);
      updateChartData();
    };
    fetchData();
  }, [fetchInvestments, updateChartData]);

  const gridApiRef = useRef<GridApi | null>(null);

  const onGridReady = (params: any) => {
    gridApiRef.current = params.api;
  };

  const onCellValueChanged = useCallback(
    async (event: CellValueChangedEvent) => {
      const errors = validateRow(event.data);
      const updatedRowData = rowData.map((row) =>
        row.id === event.data.id ? { ...row, errors } : row
      );
      if (!Object.keys(errors).length) {
        try {
          if (event.data.isNew) {
            delete event.data.isNew;
            const createdInvestment = await saveInvestment(event.data);
            setRowData((prev) =>
              prev.map((row) =>
                row.id === event.data.id
                  ? { ...row, id: createdInvestment.id }
                  : row
              )
            );
          } else {
            await updateInvestment(event.data);
            setRowData(updatedRowData);
          }
          gridApiRef.current?.applyTransaction({ update: [event.data] });
          gridApiRef.current?.refreshCells();
          updateChartData();
        } catch (error) {
          console.error("Failed to save investment:", error);
        }
      }
    },
    [rowData, updateInvestment, saveInvestment]
  );

  const defaultColDef = useMemo(() => {
    return {
      wrapHeaderText: true,
      resizable: true,
      sortable: true,
      flex: 1,
    };
  }, []);

  const addNewRow = async () => {
    const newRow: Partial<newInvestment> = {
      name: "New Stock",
      quantity: 0,
      buyPrice: 0,
      currentPrice: 0,
      isNew: true,
      errors: validateRow({
        name: "New Stock",
        quantity: 0,
        buyPrice: 0,
        currentPrice: 0,
      }),
    };
    const updatedRowData = [...rowData, newRow];
    setRowData(updatedRowData);
    gridApiRef.current?.applyTransaction({ add: [newRow] });
    gridApiRef.current?.refreshCells();
  };

  const handleExportToCsv = () => {
    gridApiRef.current?.exportDataAsCsv({
      fileName: "investments.csv",
      columnKeys: ["name", "quantity", "buyPrice", "currentPrice"],
    });
  };
  const handleExportToExcel = () => {
    const rest = rowData.map(({ errors, isNew, userId, ...rest }) => rest);
    exportToExcel("investments.xlsx", rest);
  };

  return (
    <div className="flex flex-col h-auto">
      <div className="mb-4">
        <Button className="mr-4" onClick={addNewRow}>
          Add New Row
        </Button>
        <Button onClick={handleExportToCsv}>Export to CSV</Button>
        <Button className="ml-4" onClick={handleExportToExcel}>
          Export to Excel
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
