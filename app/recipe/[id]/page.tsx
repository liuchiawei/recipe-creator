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
            <p className="text-lg text-gray-600 mb-4 text-center">{recipe.description}</p>

            <div className="flex">
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">材料</h2>
                    <ul className="list p-3 space-y-2 bg-orange-50 rounded">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="py-2 text-sm text-gray-700 border-b border-white">
                                {ingredient.name} - {ingredient.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">作り方</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                        {recipe.steps && recipe.steps.map((step) => (
                            <li key={step.stepNumber} className="text-lg text-gray-700">
                                {step.instruction}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    type="button"
                    className="ml-4 border border-blue-500 text-blue-500 rounded px-4 py-2"
                    onClick={() => router.push('/recipe')}
                >
                    戻る
                </button>
            </div>
        </div>
    );
}
