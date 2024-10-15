import React from "react";
import { ICellRendererParams } from "ag-grid-community";
import { Trash2 } from "lucide-react";
import useInvestmentsStore from "@/store/investmentsStore";

const ActionsCellRenderer = (props: ICellRendererParams) => {
  const { data, api } = props;
  const { removeInvestment, updateChartData } = useInvestmentsStore();

  const deleteRow = async () => {
    try {
      if (data.id) {
        await removeInvestment(data.id);
      }
      api.applyTransaction({ remove: [data] });
      api.refreshCells({ force: true });
      updateChartData();
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
