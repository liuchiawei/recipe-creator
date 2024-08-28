'use client'

import React, { useState, useRef } from 'react';
import AiRecipeForm from '@/app/components/AiRecipeForm';
import axios from 'axios';
import { useLoading } from '@/app/context/LoadingContext';
import { useRouter } from 'next/navigation';
import IngredientList from '@/app/components/IngredientList';
import StepList from '@/app/components/StepList';
import RecipeDetail from '@/app/components/RecipeDetail';

const PlanCreatePage: React.FC = () => {
    const router = useRouter();
    const { setLoading } = useLoading();

    const [recipe, setRecipe] = useState<Recipe>();

    const listRef = useRef<HTMLDivElement>(null);

    const onAiCreate = async (recipe: Recipe) => {
        setRecipe(recipe);
        if (listRef.current) {
            listRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const onCancel = () => {
        router.push('/admin/recipe/');
    }

    const handleSave = async () => {
        if (!recipe) return;
        try {
            setLoading(true);
            const saveResponse = await axios.post('/api/recipe/create',
                {
                    recipe: recipe,
                    ingredients: recipe.ingredients,
                    steps: recipe.steps,
                }
            );
            if (saveResponse) {
                onSave();
            }
        } catch (error) {
            console.error('Error saving travel plan:', error);
        } finally {
            setLoading(false);
        }
    };

    const onSave = async () => {
        router.push('/admin/recipe/');
    };

    return (
        <div className="pb-20">
            <h1 className="text-center text-3xl p-3">レシピ作成</h1>
            <AiRecipeForm
                onAiCreate={onAiCreate}
                onCancel={onCancel}
            />
            <div ref={listRef}>
                {recipe &&
                    <div className="my-5">
                        <RecipeDetail recipe={recipe} />
                        <IngredientList ingredients={recipe.ingredients} />
                        <StepList steps={recipe.steps} />

                        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-4">
                            <div className="text-center">
                                <button
                                    onClick={handleSave}
                                    className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default PlanCreatePage;
