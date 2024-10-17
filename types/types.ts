import { Investment } from "@prisma/client";

export interface newInvestment {
    id?: string;
    errors?: { [key: string]: string };
    name: string;
    quantity: number;
    buyPrice: number;
    currentPrice: number;
}


export interface InvestmentColDefs extends Investment {
    errors?: { [key: string]: string };
    actions: string;
}

export interface AggregatedInvestment {
    totalInvestment: number;
    totalCurrentValue: number;
    totalGainLoss: number;
}