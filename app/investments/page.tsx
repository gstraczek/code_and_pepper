import Investments from "../components/investments/investments";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { GET } from "../api/investments/route";
import { NextRequest } from "next/server";
import { Investment } from "@prisma/client";
import InvestmentsChart from "../components/investments/investmentsChart";

const fetchInvestmentsData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const req = new NextRequest(`${baseUrl}/api/investments`);
  const response = await GET(req);
  const data: Investment[] = await response.json();
  return data;
};

const InvestmentsPage = async () => {
  const investments = await fetchInvestmentsData();
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Investments initialData={investments} />
      </Suspense>
      <InvestmentsChart />
    </>
  );
};

export default InvestmentsPage;
