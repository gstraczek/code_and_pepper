import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/auth';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession({ req, ...authOptions });

    if (!session?.user) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { id } = params;

    if (!id || typeof id !== 'string') {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    try {
        await prisma.investment.delete({
            where: { id },
        });

        return NextResponse.json({ id }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete investment' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession({ req, ...authOptions });

    if (!session?.user) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { id } = params;

    if (!id || typeof id !== 'string') {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const { name, quantity, buyPrice, currentPrice } = await req.json();

    try {
        const investment = await prisma.investment.update({
            where: { id },
            data: {
                name,
                quantity,
                buyPrice,
                currentPrice,
            },
        });

        return NextResponse.json(investment);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update investment' }, { status: 500 });
    }
}