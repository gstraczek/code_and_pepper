import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavBar() {
    return (
        <div className="flex justify-between items-center py-4 px-8 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold">
                <Link href="/dashboard">Investment Tracker</Link></h1>
            <div>
                <Link href="/api/auth/signin">
                <Button>Sign In</Button>
                </Link>
            </div>
        </div>
    )
}