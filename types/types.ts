import { ColDef, ColGroupDef } from "ag-grid-community";

export interface Investment {
    id: number;
    name: string;
    quantity: number;
    buyPrice: number;
    currentPrice: number;
}

export interface InvestmentColDefs extends Investment {
    errors?: { [key: string]: string };
    actions: string;
}

export interface AggregatedInvestments {
    totalInvestment: number;
    totalCurrentValue: number;
    totalGainLoss: number;
}