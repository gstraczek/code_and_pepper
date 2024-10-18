"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-gray-800 text-white">
      <div className="flex justify-between items-center py-4 px-8">
        <div className="flex justify-between gap-8">
          <h1 className="text-2xl font-bold">
            <Link href="/dashboard">Investment Tracker</Link>
          </h1>
          <div className="hidden md:flex space-x-4">
            <Button>
              <Link href="/investments">Investments</Link>
            </Button>
            <Button>
              <Link href="/aggregated-investments">Aggregated Investments</Link>
            </Button>
          </div>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/api/auth/signin">
            <Button>Sign In</Button>
          </Link>
          <Link href="/api/auth/signout">
            <Button>Sign Out</Button>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <Menu />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="absolute inset-0 bg-gray-800 flex flex-col items-center justify-center space-y-4 z-50">
          <button
            onClick={closeMobileMenu}
            className="absolute top-4 right-4 focus:outline-none"
          >
            <X />
          </button>
          <Button>
            <Link href="/investments">Investments</Link>
          </Button>
          <Button>
            <Link href="/aggregated-investments">Aggregated Investments</Link>
          </Button>
          <Link href="/api/auth/signin">
            <Button>Sign In</Button>
          </Link>
          <Link href="/api/auth/signout">
            <Button>Sign Out</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
