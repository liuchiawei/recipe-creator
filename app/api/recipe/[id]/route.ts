import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    console.log(params)

    const recipe = await prisma.recipe.findUnique({
        where: { id: Number(params.id) },
        include: {
            ingredients: true,
            steps: true,
        },
    });
    if (!recipe) {
        return NextResponse.json({ error: 'Recipe not found' });
    }
    return NextResponse.json(recipe);
}
