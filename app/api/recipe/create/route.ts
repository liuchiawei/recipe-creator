import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { title, description, ingredients, steps } = await request.json();

        const recipe = await prisma.recipe.create({
            data: {
                title,
                description,
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

        return NextResponse.json({ success: true, recipe });
    } catch (error) {
        console.error('Error creating recipe:', error);
        return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
    }
}
