// "use client";
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

// import Investments from "../components/investments/investments";
// import useInvestments from "../hooks/useInvestments";
// import { Spinner } from "@/components/ui/spinner";
// import { Suspense, useEffect } from "react";
// import useInvestmentsStore from "@/store/investmentsStore";

// const InvestmentsPage = () => {
//   // const { investments, saveInvestment, loading, error } = useInvestments();
//   const { saveInvestment } = useInvestments();
//   const { fetchInvestments, investments, loading, error } =
//     useInvestmentsStore();

//   useEffect(() => {
//     fetchInvestments();
//   }, []);

//   if (loading) return <Spinner withBg />;
//   if (error) return <div>{error}</div>;

//   return (
//     <Investments investments={investments} saveInvestment={saveInvestment} />
//   );
// };

// export default InvestmentsPage;

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import Investments from "../components/investments/investments";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import prisma from "@/lib/prisma";
import LineChart from "../components/investments/chart";

const fetchInvestmentsData = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return;
  }

  try {
    const investments = await prisma.investment.findMany({
      where: { userId: session.user.id },
    });
    return investments;
  } catch (error) {
    return;
  }
};

const InvestmentsPage = () => {
  return (
    <Suspense fallback={<Spinner withBg />}>
      <Investments />
      <LineChart />
    </Suspense>
  );
};

export default InvestmentsPage;
