"use client";

import { Button } from "@/app/components/ui/button";
import { InvestmentColDefs, newInvestment } from "@/types/types";
import {
  ColDef,
  ITooltipParams,
  GridApi,
  CellValueChangedEvent,
  ICellRendererParams,
  GridReadyEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import ActionsCellRenderer from "./actions";
import useInvestmentsStore from "@/store/investmentsStore";
import exportToExcel from "@/lib/xlsx";
import { Investment } from "@prisma/client";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { toast } from "sonner";

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

export default function Investments({
  initialData,
}: {
  initialData: Investment[];
}) {
  const {
    updateInvestment,
    saveInvestment,
    updateChartData,
    investments,
    setInvestments,
  } = useInvestmentsStore();

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (!investments.length) {
      setInvestments(initialData);
    }
    updateChartData();
  }, [initialData, setInvestments, updateChartData]);
  const gridApiRef = useRef<GridApi | null>(null);

  const onGridReady = (params: GridReadyEvent) => {
    gridApiRef.current = params.api;
  };

  const colDefs = useMemo<ColDef<InvestmentColDefs>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        editable: false,
        minWidth: 50,
        valueGetter: (params) => params?.data?.id || "",
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
        tooltipValueGetter: (p: ITooltipParams) =>
          p.data.errors?.quantity || "",
        minWidth: 100,
      },
      {
        field: "buyPrice",
        editable: true,
        cellClassRules: {
          "bg-red-200": (params) => !!params.data?.errors?.buyPrice,
        },
        tooltipValueGetter: (p: ITooltipParams) =>
          p.data.errors?.buyPrice || "",
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
        cellRendererParams: {
          onUnlockAddRow: setIsDisabled,
        },
        minWidth: 50,
      },
    ],
    []
  );
  const onCellValueChanged = useCallback(
    async (event: CellValueChangedEvent) => {
      const errors = validateRow(event.data);

      if (!Object.keys(errors).length) {
        try {
          if (event.data.id === "temp") {
            gridApiRef.current?.applyTransaction({ update: [event.data] });
            const savedInvestment = await saveInvestment(event.data);
            const updatedRow = {
              ...event.data,
              id: savedInvestment.id,
            };
            setIsDisabled(false);
          } else {
            await updateInvestment(event.data);
          }
          gridApiRef.current?.refreshCells();
          updateChartData();
        } catch (error) {
          toast.error("Failed to save investment");
        }
      }
    },
    [updateInvestment, saveInvestment, updateChartData]
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
    setIsDisabled(true);
    const newRow: Partial<newInvestment> = {
      id: "temp",
      name: "New Stock",
      quantity: 0,
      buyPrice: 0,
      currentPrice: 0,
      errors: validateRow({
        name: "New Stock",
        quantity: 0,
        buyPrice: 0,
        currentPrice: 0,
      }),
    };

    gridApiRef.current?.applyTransaction({ add: [newRow] });
  };

  const handleExportToCsv = () => {
    gridApiRef.current?.exportDataAsCsv({
      fileName: "investments.csv",
      columnKeys: ["name", "quantity", "buyPrice", "currentPrice"],
    });
  };
  const handleExportToExcel = () => {
    const rest = investments.map(
      //eslint-disable-next-line
      ({ userId, ...rest }) => rest
    );
    exportToExcel("investments", rest);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Investments Table</h1>
      <div className="flex flex-col h-auto">
        <div className="mb-4 flex">
          <div className="mb-4 flex flex-wrap space-x-4">
            <Button
              className="sm:mb-0 sm:py-2 sm:px-4 py-1 px-2 text-xs sm:text-sm md:text-base"
              onClick={addNewRow}
              disabled={isDisabled}
              data-testid="add-new-row"
            >
              Add New Row
            </Button>
            <Button
              className="sm:mb-0 sm:py-2 sm:px-4 py-1 px-2 text-xs sm:text-sm md:text-base"
              onClick={handleExportToCsv}
              disabled={!investments.length}
            >
              Export to CSV
            </Button>
            <Button
              className="sm:mb-0 sm:py-2 sm:px-4 py-1 px-2 text-xs sm:text-sm md:text-base"
              onClick={handleExportToExcel}
              disabled={!investments.length}
            >
              Export to Excel
            </Button>
          </div>
        </div>
        <div className="ag-theme-quartz">
          <AgGridReact
            animateRows={true}
            rowData={investments}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            onCellValueChanged={onCellValueChanged}
            onGridReady={onGridReady}
            domLayout="autoHeight"
          />
        </div>
      </div>
    </>
  );
}
