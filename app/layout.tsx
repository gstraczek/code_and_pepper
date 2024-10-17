import "./globals.css";

import { getSession } from "@/auth";
import Providers from "./providers";
import NavBar from "./components/navbar/navbar";
import { Toaster } from "sonner";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    return redirect("api/auth/signin");
  }
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-gray-100 via-gray-200 to-blue-100 min-h-screen">
        <Providers session={session}>
          <NavBar />
          <div className="container mx-auto p-4">{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
