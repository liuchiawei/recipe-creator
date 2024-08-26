import { NextRequest, NextResponse } from 'next/server';
import { CreateRecipe } from '@/app/services/AiRecipe';

export async function POST(req: NextRequest) {
    try {
        const recipe = await req.json();
        const aiRecipe = await CreateRecipe(recipe);
        console.log("recipe:", recipe);
        console.log(aiRecipe);
        if (!aiRecipe) return NextResponse.json({ error: 'Cannot create recipe' });
        return NextResponse.json(aiRecipe);
    } catch (error) {
        return NextResponse.json({ error: 'GoogleGenerativeAI error' });
    }
}