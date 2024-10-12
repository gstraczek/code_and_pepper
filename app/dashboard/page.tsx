import React from 'react';

import Link from 'next/link';

export default function Dashboard() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
              <div className="mt-4">
              <Link href="/investments">Investments</Link>
                <Link href="/aggregated-investments">Aggregated Investments</Link>
            </div>
        </div>
    );
}