"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useInvestmentsStore from "@/store/investmentsStore";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const InvestmentsChart = () => {
  const { chartData } = useInvestmentsStore();

  const getColor = (currentPrice: number, buyPrice: number) =>
    currentPrice > buyPrice ? "rgba(144, 238, 144)" : "rgba(255, 182, 193)";

  const data = {
    labels: chartData?.labels,
    datasets: [
      {
        label: "Buy Price",
        data: chartData.buyPriceDatasets,
        backgroundColor: "rgba(173, 216, 230)",
      },
      {
        label: "Current Price",
        data: chartData.currPriceDatasets,
        backgroundColor: chartData.currPriceDatasets?.map((price, index) =>
          getColor(price, chartData.buyPriceDatasets[index])
        ),
      },
    ],
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 mt-4">Investments Chart</h1>
      <div className="w-full h-auto">
        <Bar data={data} />
      </div>
    </>
  );
};

export default InvestmentsChart;
