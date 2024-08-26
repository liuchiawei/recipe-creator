import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const data = await req.json();
    const { title, description, ingredients } = data;

    const updatedRecipe = await prisma.recipe.update({
        where: { id: Number(params.id) },
        data: {
            title,
            description,
        },
    });

    await prisma.ingredient.deleteMany({
        where: { recipeId: Number(params.id) },
    });

    for (const ingredient of ingredients) {
        await prisma.ingredient.create({
            data: {
                name: ingredient.name,
                quantity: ingredient.quantity,
                recipeId: updatedRecipe.id,
            },
        });
    }

    return NextResponse.json(updatedRecipe);
}
