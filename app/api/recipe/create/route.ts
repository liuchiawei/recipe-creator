import { NextResponse } from 'next/server';
import { createRecipe } from '@/app/models/Recipe';

export async function POST(request: Request) {
    try {
        const { recipe, ingredients, steps } = await request.json();
        const newRecipe = await createRecipe(recipe, ingredients, steps);
        if (!newRecipe) {
            return NextResponse.json({ success: false });
        } else {
            return NextResponse.json({ success: true, newRecipe });
        }
    } catch (error) {
        console.error('Error creating recipe:', error);
        return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
    }
}
