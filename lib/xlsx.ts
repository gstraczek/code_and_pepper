import { AggregatedInvestments, Investment } from "@/types/types";

import * as XLSX from "xlsx";

const exportToExcel = (filename: string, rows: Investment[] | AggregatedInvestments[]) => {
    try {
        if (rows.length) {
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils?.json_to_sheet(rows);
            XLSX.utils.book_append_sheet(workbook, worksheet, filename);
            // Save the workbook as an Excel file
            XLSX.writeFile(workbook, `${filename}.xlsx`);
        }
    } catch (err) {
        console.error(err);
    }
}
export default exportToExcel;
