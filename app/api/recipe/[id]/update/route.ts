import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const recipeId = Number(params.id);
        const { title, description, ingredients, steps } = await request.json();

        // 既存の材料と手順を削除してから再作成する
        await prisma.ingredient.deleteMany({
            where: { recipeId },
        });

        await prisma.step.deleteMany({
            where: { recipeId },
        });

        // レシピの更新
        const updatedRecipe = await prisma.recipe.update({
            where: { id: recipeId },
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

        return NextResponse.json({ success: true, recipe: updatedRecipe });
    } catch (error) {
        console.error('Error updating recipe:', error);
        return NextResponse.json({ error: 'Failed to update recipe' }, { status: 500 });
    }
}
