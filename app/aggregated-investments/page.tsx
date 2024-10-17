import { NextRequest } from "next/server";
import { GET } from "../api/aggregated-investments/route";
import AggregatedInvestments from "../components/aggregated-investments/aggregatedInvestments";
import { AggregatedInvestment } from "@/types/types";
import AggregatedInvestmentsChart from "../components/aggregated-investments/aggregatedInvestmentsChart";

const fetchInvestmentsData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const req = new NextRequest(`${baseUrl}/api/aggregated-investments`);
  const response = await GET(req);
  const data: AggregatedInvestment[] = await response.json();
  return data;
};

const InvestmentsPage = async () => {
  const aggregatedInvestments = await fetchInvestmentsData();
  return (
    <>
      <AggregatedInvestments initialData={aggregatedInvestments} />
      <AggregatedInvestmentsChart />
    </>
  );
};

export default InvestmentsPage;
