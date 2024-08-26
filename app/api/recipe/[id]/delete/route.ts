import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    console.log(id)

    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid recipe ID' }, { status: 400 });
    }

    try {
        await prisma.recipe.delete({
            where: { id: id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete recipe' }, { status: 500 });
    }
}
