'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import GenreInput from './GenreInput';

const initRecipe: Recipe = {
    id: 0,
    title: "",
    genre: "",
    description: "",
    keywords: "",
    ingredients: [],
    steps: [],
};

const NewRecipeForm = () => {
    const router = useRouter();
    const [recipe, setRecipe] = useState<Recipe>(initRecipe);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [steps, setSteps] = useState<Step[]>([]);

    const addIngredient = () => {
        setIngredients([...ingredients, { id: 0, name: '', quantity: '' }]);
    };

    const addStep = () => {
        setSteps([...steps, { id: 0, stepNumber: 0, instruction: '' }]);
    };

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setRecipe(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRecipeChange = (key: keyof Recipe, value: string) => {
        setRecipe(prev => {
            return {
                ...prev,
                [key]: value,
            };
        });
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

        await axios.post(`/api/recipe/create`, payload);

        router.push('/admin/recipe');
    };

    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/admin/recipe');
    };

    return (
        <div className="mx-auto p-6 bg-white border rounded-lg space-y-6">
            <h1 className="text-2xl text-center font-bold mb-4">レシピ作成</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">タイトル</label>
                    <input
                        name="title"
                        type="text"
                        className="border border-gray-300 rounded p-2 w-full"
                        value={recipe?.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <GenreInput
                        value={recipe?.genre}
                        onChange={handleRecipeChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">説明</label>
                    <textarea
                        name="description"
                        className="border border-gray-300 rounded p-2 w-full"
                        value={recipe?.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">材料</label>
                    <button
                        type="button"
                        className="bg-blue-500 text-sm text-white rounded px-4 py-1"
                        onClick={addIngredient}
                    >
                        材料を追加
                    </button>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="mb-2 flex">
                            <input
                                type="text"
                                placeholder="材料"
                                className="border border-gray-300 rounded p-2 w-full mr-2"
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
                                className="border border-gray-300 rounded p-2 w-full"
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
                        </div>
                    ))}
                </div>

                <div className="mb-4 py-5 border-b">
                    <label className="block text-sm font-medium mb-2">手順</label>
                    <button
                        type="button"
                        className="bg-blue-500 text-sm text-white rounded px-4 py-1"
                        onClick={addStep}
                    >
                        手順を追加
                    </button>
                    {steps.map((step, index) => (
                        <div key={index} className="mb-2 flex">
                            <textarea
                                placeholder={`手順 ${index + 1}`}
                                className="border border-gray-300 rounded p-2 w-full"
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
                        </div>
                    ))}
                </div>

                <div className="mt-2 flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-4 py-1"
                    >
                        保存
                    </button>

                    <button
                        type="button"
                        className="border border-blue-500 text-blue-500 rounded px-4 py-1"
                        onClick={handleCancel}
                    >
                        戻る
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewRecipeForm;
