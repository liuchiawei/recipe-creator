'use client'

import React, { useState, useRef } from 'react';
import AiPlanForm from '@/app/components/AiRecipeForm';
import AiPlanList from '@/app/components/AiRecipeList';
import axios from 'axios';
import { useLoading } from '@/app/context/LoadingContext';
import { useRouter } from 'next/navigation';

const PlanCreatePage: React.FC = () => {
    const router = useRouter();
    const { setLoading } = useLoading();
    const listRef = useRef<HTMLDivElement>(null);

    const [recipe, setRecipe] = useState<Recipe>();
    const [ingredients, setIngredients] = useState<Ingredient[]>();
    const [steps, setSteps] = useState<Step[]>();

    const onAiCreate = async (recipe: Recipe) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/ai/create', recipe);
            console.log(response.data)

            const ingredients = response.data.ingredients;
            setIngredients(ingredients);

            const steps = response.data.steps;
            setSteps(steps);

            setRecipe(recipe);
        } catch (error) {
            console.error('Error creating recipe:', error);
        } finally {
            setLoading(false);
            if (listRef.current) {
                listRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const onCancel = () => {
        router.push('/');
    }

    const onSave = async () => {
        router.push('/');
    };

    return (
        <div className="pb-20">
            <h1 className="text-center text-3xl p-3">レシピクリエーター</h1>
            <AiPlanForm
                onAiCreate={onAiCreate}
                onCancel={onCancel}
            />
            <div ref={listRef}>
                {recipe && ingredients &&
                    <AiPlanList
                        recipe={recipe}
                        ingredients={ingredients}
                        steps={steps}
                        onSave={onSave}
                    />
                }
            </div>
        </div>
    );
};

export default PlanCreatePage;
