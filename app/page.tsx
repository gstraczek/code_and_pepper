import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardFooter } from "./components/ui/card";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] overflow-y-auto">
      <Card className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold">Welcome to Investment Tracker</h2>
        </CardHeader>
        <p className="text-gray-700 text-center">
          Investment Tracker helps you manage your daily investments, aggregate
          your investments, and calculate your income. Get started by exploring
          the features below.
        </p>
        <CardFooter className="mt-4 flex flex-col items-center space-y-2">
          <Link href="/investments" className="text-blue-500 hover:underline">
            Investments
          </Link>
          <Link
            href="/aggregated-investments"
            className="text-blue-500 hover:underline"
          >
            Aggregated Investments
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
