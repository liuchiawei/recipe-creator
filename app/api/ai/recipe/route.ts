import { NextRequest, NextResponse } from 'next/server';
import { CreateRecipe } from '@/app/services/AiRecipe';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const timeOfDay = formData.get('timeOfDay') as string;
        const genre = formData.get('genre') as string;
        const keywords = formData.get('keywords') as string;

        const imageFile = formData.get('image') as File | null;
        var image: ArrayBuffer | null = null;
        if (imageFile) {
            image = await imageFile.arrayBuffer();
        }

        const order:Order = {
            timeOfDay,
            genre,
            keywords,
            image,
        };

        console.log("order", order)
        return NextResponse.json(formData);
        // const order = await req.json();
      
        // const aiRecipe = await CreateRecipe(order);
        // console.log("order:", order);
        // console.log(aiRecipe);
        // if (!aiRecipe) return NextResponse.json({ error: 'Cannot create recipe' });
        // return NextResponse.json(aiRecipe);
    } catch (error) {
        return NextResponse.json({ error: 'GoogleGenerativeAI error' });
    }
}