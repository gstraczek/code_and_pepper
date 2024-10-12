import React from "react";
import { ICellRendererParams } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import axios from "axios";

const ActionsCellRenderer = (props: ICellRendererParams) => {
  const { data, api } = props;

  const deleteRow = () => {
    api.applyTransaction({ remove: [data] });
  };

  const saveRow = async () => {
    try {
      const response = await axios.post("/api/investments", data);
      const updatedData = response.data;
      api.applyTransaction({ update: [updatedData] });
    } catch (error) {
      console.error("Failed to save row:", error);
    }
  };

  return (
    <div>
      <Button className="mr-2" onClick={saveRow}>
        Save
      </Button>
      <Button onClick={deleteRow}>Delete</Button>
    </div>
  );
};

export default ActionsCellRenderer;
