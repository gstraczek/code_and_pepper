import "./globals.css";

import { getSession } from "@/auth"
import Providers from "./providers"
import { redirect } from "next/navigation";
import NavBar from "./components/navbar/navbar";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";


export default async function RootLayout({ children }: { children: React.ReactNode}) {
    const session = await getSession()
    // if (!session) {
    //   return redirect("api/auth/signin")
    // }
    return (
        <html lang="en">
            <body className='bg-gradient-to-b from-gray-100 via-gray-200 to-blue-100'>
                <Providers session={session}>
                    <NavBar />
                    <Suspense fallback={<Spinner withBg/>}>
                    <div className="container mx-auto p-4">
                    {children}
                    </div>
                    </Suspense>
                </Providers>
            </body>
        </html>
    )
}