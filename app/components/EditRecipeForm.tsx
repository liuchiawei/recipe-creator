'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Ingredient {
    id?: number;
    name: string;
    quantity: string;
}

interface Step {
    id?: number;
    instruction: string;
}

export default function EditRecipeForm({ recipeId }: { recipeId: string }) {
    const router = useRouter();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', quantity: '' }]);
    const [steps, setSteps] = useState<Step[]>([{ instruction: '' }]);

    useEffect(() => {
        async function fetchRecipe() {
            const response = await axios.get(`/api/recipe/${recipeId}`);
            if (response.data.error) {
                router.push('/admin/recipe');
                return;
            }

            const recipe = response.data;
            setRecipe(recipe);
            setIngredients(recipe.ingredients);
            setSteps(recipe.steps);
        }

        fetchRecipe();
    }, [router, recipeId]);

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    const addStep = () => {
        setSteps([...steps, { instruction: '' }]);
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const removeStep = (index: number) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    const handleRecipeChange = (key: keyof Recipe, value: string) => {
        setRecipe(prevRecipe => {
            if (!prevRecipe) return null;
            return {
                ...prevRecipe,
                [key]: value,
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await axios.put(`/api/recipe/${recipeId}/update`, {
            ...recipe,
            ingredients,
            steps,
        });

        router.push('/admin/recipe');
    };

    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/admin/recipe');
    };

    const handleDelete = async () => {
        const confirmDelete = confirm('このレシピを削除しますか？');
        if (confirmDelete) {
            await axios.delete(`/api/recipe/${recipeId}`);
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
                        value={recipe?.title || ''}
                        onChange={(e) => handleRecipeChange('title', e.target.value)}
                        required
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
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">材料</h2>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center mb-4">
                            <input
                                type="text"
                                placeholder="材料"
                                className="border border-gray-300 rounded p-3 w-full mr-2"
                                value={ingredient.name}
                                onChange={(e) =>
                                    setIngredients(
                                        ingredients.map((ing, i) =>
                                            i === index ? { ...ing, name: e.target.value } : ing
                                        )
                                    )
                                }
                                required
                            />
                            <input
                                type="text"
                                placeholder="数量"
                                className="border border-gray-300 rounded p-3 w-40 mr-2"
                                value={ingredient.quantity}
                                onChange={(e) =>
                                    setIngredients(
                                        ingredients.map((ing, i) =>
                                            i === index ? { ...ing, quantity: e.target.value } : ing
                                        )
                                    )
                                }
                                required
                            />
                            <button
                                type="button"
                                className="text-xs text-red-500 hover:text-red-700"
                                onClick={() => removeIngredient(index)}
                            >
                                削除
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="bg-blue-500 text-sm text-white rounded px-4 py-2"
                        onClick={addIngredient}
                    >
                        材料を追加
                    </button>
                </div>

                <div className="mb-8">
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
