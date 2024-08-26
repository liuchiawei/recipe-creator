import React from 'react';
import { useLoading } from '@/app/context/LoadingContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface AiRecipeListtProps {
    recipe: Recipe;
    ingredients: Ingredient[];
    steps: Step[];
    onSave: () => void;
}

const AiRecipeList: React.FC<AiRecipeListtProps> = ({ recipe, ingredients, steps, onSave }) => {
    // const { setLoading } = useLoading();

    const handleSave = async () => {
        if (!recipe || !ingredients || !steps) return;
        try {
            // setLoading(true);
            const saveResponse = await axios.post('/api/ai/save',
                {
                    recipe: recipe,
                    ingredients: ingredients,
                    steps: steps,
                }
            );
            if (saveResponse) {
                onSave();
            }
        } catch (error) {
            console.error('Error saving travel plan:', error);
        } finally {
            // setLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-4">
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="bg-gray-100 p-3 rounded-lg shadow">
                        <div className="text-gray-700 my-4">
                            <span className="text-xs font-semibold rounded p-2 mx-2  bg-green-500 text-white">
                                材料
                            </span>
                            {ingredient.name}
                        </div>
                        <div className="text-gray-700 mx-2">
                            {ingredient.quantity}
                        </div>
                    </div>
                ))}
            </div>
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
        </>
    );
};

export default AiRecipeList;
