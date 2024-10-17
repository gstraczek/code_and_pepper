import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex justify-between items-center py-4 px-8 bg-gray-800 text-white">
      <div className="flex space-x-4">
        <h1 className="text-2xl font-bold mr-4">
          <Link href="/dashboard">Investment Tracker</Link>
        </h1>
        <Button>
          <Link href="/investments">Investments</Link>
        </Button>
        <Button>
          <Link href="/aggregated-investments">Aggregated Investments</Link>
        </Button>
      </div>
      <div className="flex space-x-4">
        <div>
          <Link href="/api/auth/signin">
            <Button>Sign In</Button>
          </Link>
        </div>
        <div>
          <Link href="/api/auth/signout">
            <Button>Sign Out</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
