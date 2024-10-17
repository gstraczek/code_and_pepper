import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

//eslint-disable-next-line
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const investments = await prisma.investment.findMany({
            where: { userId: session.user.id },
        });

        const totalInvestment = investments.reduce((acc, { quantity, buyPrice }) => {
            return acc + quantity * buyPrice;
        }, 0);

        const totalCurrentValue = investments.reduce((acc, { quantity, currentPrice }) => {
            return acc + quantity * currentPrice;
        }, 0);

        const totalGainLoss = totalCurrentValue - totalInvestment;

        return NextResponse.json([{ totalInvestment, totalCurrentValue, totalGainLoss }]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch investments' + error }, { status: 500 });
    }
}