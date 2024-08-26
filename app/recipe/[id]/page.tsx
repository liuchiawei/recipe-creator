'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function RecipeDetailPage() {
    const router = useRouter();
    const params = useParams();

    const recipeId = params.id as string;

    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        async function fetchRecipe() {
            const response = await fetch(`/api/recipe/${recipeId}`);
            const data = await response.json();
            setRecipe(data);
        }

        fetchRecipe();
    }, [recipeId]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{recipe.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{recipe.description}</p>

            <div className="flex flex-wrap">
                <div className="w-1/3">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">材料</h2>
                    <ul className="list p-3 space-y-2 bg-orange-50 rounded">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="py-2 text-sm text-gray-700 border-b border-white">
                                <div className="flex flex-wrap">
                                    <div className="w-1/2">
                                        {ingredient.name}
                                    </div>
                                    <div className="w-1/2">
                                        {ingredient.quantity}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-2/3 px-3">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">作り方</h2>
                    <ul className="list-none space-y-2">
                        {recipe.steps && recipe.steps.map((step) => (
                            <li key={step.stepNumber} className="flex items-start text-sm text-gray-700">
                                <div>
                                    <span className="flex items-center justify-center w-5 h-5 tex-xs text-white bg-blue-500 rounded-full mr-4">
                                        {step.stepNumber}
                                    </span>
                                </div>
                                <div>
                                    {step.instruction}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
