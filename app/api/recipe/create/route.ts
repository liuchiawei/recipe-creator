import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { title, description, ingredients } = data;

    const recipe = await prisma.recipe.create({
        data: {
            title,
            description,
        },
    });
    return NextResponse.json(recipe);
}