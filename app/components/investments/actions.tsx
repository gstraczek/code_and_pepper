"use client";
import React, { SetStateAction } from "react";
import { ICellRendererParams } from "ag-grid-community";
import { Trash2 } from "lucide-react";
import useInvestmentsStore from "@/store/investmentsStore";
import { toast } from "sonner";

interface ActionsCellRendererProps extends ICellRendererParams {
  onUnlockAddRow: (value: SetStateAction<boolean>) => void;
}

const ActionsCellRenderer = (props: ActionsCellRendererProps) => {
  const { api, onUnlockAddRow, node } = props;
  const { removeInvestment, updateChartData } = useInvestmentsStore();

  const deleteRow = async () => {
    try {
      // remove temp investment as it is not saved and not in the database
      if (typeof node.data.id === "number") {
        try {
          api.applyTransaction({ remove: [node.data] });
          await removeInvestment(node.data.id);
        } catch (error) {
          toast.error("Failed to delete row");
        }
        updateChartData();
      }

      onUnlockAddRow(false);
    } catch (error) {
      return console.error("Failed to delete row:", error);
    }
  };
  return (
    <div>
      <button onClick={deleteRow} id="delete-row-button">
        <Trash2 />
      </button>
    </div>
  );
};

export default ActionsCellRenderer;
