import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const investments = await prisma.investment.findMany({
      where: { userId: session.user.id },
    });

    return NextResponse.json(investments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch investments' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const { name, quantity, buyPrice, currentPrice } = await req.json();

  try {
    const investment = await prisma.investment.create({
      data: {
        name,
        quantity,
        buyPrice,
        currentPrice,
        userId: session.user.id,
      },
    });

    return NextResponse.json(investment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create investment' }, { status: 500 });
  }
}
