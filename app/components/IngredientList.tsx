import React from 'react';
import { genres } from '../data/genres';

interface IngredientsProps {
    ingredients: Ingredient[];
}

export default function IngredientList({ ingredients }: IngredientsProps) {
    return (
        <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">材料</h2>
            <ul className="list p-3 space-y-2 bg-orange-50 rounded">
                {ingredients && ingredients.map((ingredient, index) => (
                    <li key={`ingredient-${index}`} className="py-2 text-sm text-gray-700 border-b border-white">
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
        </>
    );
}
