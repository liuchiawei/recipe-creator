import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { recipe, ingredients, steps } = await request.json();

        console.log(recipe)
        console.log(ingredients)
        console.log(steps)
        if (!recipe) {
            return NextResponse.json({ success: false, });
        }

        const newRecipe = await prisma.recipe.create({
            data: {
                title: recipe.title,
                description: recipe.description,
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

        return NextResponse.json({ success: true, newRecipe });
    } catch (error) {
        console.error('Error creating recipe:', error);
        return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
    }
}
