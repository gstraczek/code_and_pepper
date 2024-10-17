import React, { SetStateAction } from "react";
import { ICellRendererParams } from "ag-grid-community";
import { Trash2 } from "lucide-react";
import useInvestmentsStore from "@/store/investmentsStore";

interface ActionsCellRendererProps extends ICellRendererParams {
  onUnlockAddRow: (value: SetStateAction<boolean>) => void;
}

const ActionsCellRenderer = (props: ActionsCellRendererProps) => {
  const { data, api, onUnlockAddRow } = props;
  const { removeInvestment, updateChartData } = useInvestmentsStore();

  const deleteRow = async () => {
    try {
      // remove temp investment as it is not saved and not in the database
      // if (!data.id) {
      await removeInvestment(data.id);
      updateChartData();
      // }
      api.applyTransaction({ remove: [data] });
      onUnlockAddRow(false);
    } catch (error) {
      return console.error("Failed to delete row:", error);
    }
  };
  return (
    <div>
      <button onClick={deleteRow}>
        <Trash2 />
      </button>
    </div>
  );
};

export default ActionsCellRenderer;
