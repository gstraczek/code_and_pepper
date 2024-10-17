"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useAggregatedInvestmentsStore from "@/store/aggregatedInvestmentsStore";

ChartJS.register(ArcElement, Tooltip, Legend);

const AggregatedInvestmentsChart = () => {
  const { aggregatedInvestments } = useAggregatedInvestmentsStore();

  const totalInvestment = aggregatedInvestments.reduce(
    (sum, investment) => sum + investment.totalInvestment,
    0
  );
  const totalCurrentValue = aggregatedInvestments.reduce(
    (sum, investment) => sum + investment.totalCurrentValue,
    0
  );

  const data = {
    labels: ["Total Investment", "Total Current Value"],
    datasets: [
      {
        data: [totalInvestment, totalCurrentValue],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 mt-4">
        Aggregated Investments Chart
      </h1>
      <Pie className="max-h-[500px]" data={data} />;
    </>
  );
};

export default AggregatedInvestmentsChart;
