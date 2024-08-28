'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import GenreInput from '@/app/components/GenreInput';
import KeywordInput from '@/app/components/KeywordInput';
import IngredientForm from '@/app/components/IngredientForm';
import StepForm from './StepForm';

interface EditRecipeFormProps {
    initRecipe: Recipe;
}

const EditRecipeForm = ({ initRecipe }: EditRecipeFormProps) => {
    const router = useRouter();

    const [recipe, setRecipe] = useState<Recipe>(initRecipe);
    const [ingredients, setIngredients] = useState<Ingredient[]>(initRecipe.ingredients);
    const [steps, setSteps] = useState<Step[]>(initRecipe.steps);

    const addIngredient = () => {
        setIngredients([...ingredients, { id: 0, name: '', quantity: '' }]);
        console.log(ingredients)
    };

    const addStep = () => {
        setSteps([...steps, { id: 0, stepNumber: 0, instruction: '' }]);
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleIngredientChange = (index: number, name: string, quantity: string) => {
        setIngredients(
            ingredients.map((value, i) =>
                i === index ? { ...value, name, quantity } : value
            )
        );
    };

    const handleStepChange = (index: number, instruction: string) => {
        setSteps(
            steps.map((value, i) =>
                i === index ? { ...value, instruction: instruction } : value
            )
        )
    }

    const removeStep = (index: number) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    const handleRecipeChange = (key: keyof Recipe, value: string) => {
        setRecipe(prev => {
            return {
                ...prev,
                [key]: value,
            };
        });
    };

    const handleGenreChange = (genre: string) => {
        setRecipe(prev => ({
            ...prev,
            genre: genre,
        }));
    };

    const handleKeywordsChange = (keywords: string) => {
        setRecipe(prev => ({
            ...prev,
            keywords,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            recipe: {
                title: recipe.title,
                description: recipe.description,
                genre: recipe.genre,
                keywords: recipe.keywords,
            },
            ingredients,
            steps,
        };

        await axios.put(`/api/recipe/${recipe.id}/update`, payload);

        router.push('/admin/recipe');
    };

    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/admin/recipe');
    };

    const handleDelete = async () => {
        const confirmDelete = confirm('このレシピを削除しますか？');
        if (confirmDelete) {
            await axios.delete(`/api/recipe/${recipe.id}/delete`);
            router.push('/admin/recipe');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <form onSubmit={handleSubmit}>
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">タイトル</label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded p-3 w-full"
                        value={recipe?.title}
                        onChange={(e) => handleRecipeChange('title', e.target.value)}
                        required
                    />
                </div>

                <div className="mb-8">
                    <GenreInput
                        value={recipe?.genre}
                        onChange={handleGenreChange}
                    />
                </div>

                <div className="mb-8">
                    <KeywordInput
                        keywords={recipe?.keywords}
                        onKeywordsChange={handleKeywordsChange}
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">説明</label>
                    <textarea
                        className="border border-gray-300 rounded p-3 w-full"
                        value={recipe?.description || ''}
                        onChange={(e) => handleRecipeChange('description', e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-8">
                    <IngredientForm
                        ingredients={ingredients}
                        onAddIngredient={addIngredient}
                        onRemoveIngredient={removeIngredient}
                        onChangeIngredient={handleIngredientChange}
                    />
                </div>

                <div className="mb-8">
                    <StepForm
                        steps={steps}
                        onAddStep={addStep}
                        onRemoveStep={removeStep}
                        onChangeStep={handleStepChange}
                    />
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">手順</h2>
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center mb-4">
                            <textarea
                                placeholder={`手順 ${index + 1}`}
                                className="border border-gray-300 rounded p-3 w-full"
                                value={step.instruction}
                                onChange={(e) =>
                                    setSteps(
                                        steps.map((s, i) =>
                                            i === index ? { ...s, instruction: e.target.value } : s
                                        )
                                    )
                                }
                                required
                            />
                            <button
                                type="button"
                                className="text-xs text-red-500 hover:text-red-700 ml-2"
                                onClick={() => removeStep(index)}
                            >
                                削除
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="bg-blue-500 text-sm text-white rounded px-4 py-2"
                        onClick={addStep}
                    >
                        手順を追加
                    </button>
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-green-500 text-white rounded px-4 py-2"
                    >
                        保存
                    </button>
                    <button
                        type="button"
                        className="border border-blue-500 text-blue-500 rounded px-4 py-2"
                        onClick={handleCancel}
                    >
                        戻る
                    </button>
                </div>
                <div className="my-5 flex justify-end">
                    <button
                        type="button"
                        className="bg-red-500 text-white rounded px-4 py-2"
                        onClick={handleDelete}
                    >
                        削除
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditRecipeForm;