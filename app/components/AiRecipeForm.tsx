'use client'

import React, { useState } from 'react';

interface TravelFormProps {
    onAiCreate: (recipe: Recipe) => void;
    onCancel: () => void;
    editRecipe?: Recipe,
}

const initRecipe: Recipe = {
    id: 0,
    title: '',
    description: '',
    ingredients: [],
    steps: [],
}

const AiRecipeForm: React.FC<TravelFormProps> = ({ onAiCreate, onCancel, editRecipe }) => {
    const [recipe, setRecipe] = useState<Recipe>(editRecipe ? editRecipe : initRecipe);
    const [errors, setErrors] = useState<{ departure?: string; destination?: string }>({});

    const validateForm = () => {
        const newErrors: { departure?: string; destination?: string } = {};
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRecipe(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAiCreate = async () => {
        if (validateForm()) {
            onAiCreate(recipe);
        }
    };

    const handleCancel = async () => {
        onCancel();
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
            <div className="">
                <div className="mb-2 py-1 px-2 rounded bg-green-500 text-white text-sm">
                    キーワード
                </div>
            </div>

            <div className="flex justify-center">
                <button onClick={handleAiCreate} type="button" className="mx-1 py-2 px-4 bg-blue-500 text-white rounded-md">
                    AI Recipe
                </button>
                <button onClick={handleCancel} type="button" className="mx-1 py-2 px-4 bg-white text-blue-500 border border-blue-500 rounded-md">
                    Close
                </button>
            </div>
        </div>
    );
};

export default AiRecipeForm;
