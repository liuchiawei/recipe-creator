import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { plan, planItems } = await req.json();

        console.log("Plan: ", plan);
        console.log("Plan Items:", planItems);

        const savedPlan = await prisma.plan.create({
            data: plan,
        });

        const savedItems = [];
        for (const planItem of planItems) {
            const formattedDate = new Date(planItem.date);

            const savedItem = await prisma.planItem.create({
                data: {
                    ...planItem,
                    date: formattedDate,
                    planId: savedPlan.id,
                },
            });
            savedItems.push(savedItem);
        }

        return NextResponse.json({ 
            success: true, 
            plan: savedPlan,
            planItems: savedItems,
        });
    } catch (error) {
        console.error('Error saving plan:', error);
        return NextResponse.json({ error: 'Failed to save plan' }, { status: 500 });
    }
}
