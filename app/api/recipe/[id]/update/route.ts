import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const recipeId = Number(params.id);
        const { recipe, ingredients, steps } = await request.json();

        console.log("Recipe:", recipe); 

        if (!recipe) {
            return NextResponse.json({ success: false, });
        }

        await prisma.ingredient.deleteMany({
            where: { recipeId },
        });

        await prisma.step.deleteMany({
            where: { recipeId },
        });

        const updatedRecipe = await prisma.recipe.update({
            where: { id: recipeId },
            data: {
                title: recipe.title,
                description: recipe.description,
                genre: recipe.genre,
                keywords: recipe.keywords,
                ingredients: {
                    create: ingredients.map((ingredient: { name: string; quantity: string }) => ({
                        name: ingredient.name,
                        quantity: ingredient.quantity,
                    })),
                },
                steps: {
                    create: steps.map((step: { instruction: string }, index: number) => ({
                        stepNumber: index + 1,
                        instruction: step.instruction,
                    })),
                },
            },
        });

        return NextResponse.json({ success: true, recipe: updatedRecipe });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update recipe' }, { status: 500 });
    }
}