'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Ingredient {
    name: string;
    quantity: string;
}

export default function EditRecipeForm({ recipeId }: { recipeId: string }) {
    const router = useRouter();
    const [recipe , setRecipe] = useState<Recipe>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', quantity: '' }]);

    useEffect(() => {
        async function fetchRecipe() {
            const response = await axios.get(`/api/recipe/${recipeId}`);
            if (response.data.error) {
                router.push('/admin/recipe')
                return;
            }

            const recipe = response.data;
            console.log(recipe)

            setRecipe(recipe)
            setIngredients(recipe?.ingredients)
        }

        fetchRecipe();
    }, [router, recipeId]);

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch(`/api/recipe/${recipeId}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, ingredients }),
        });

        router.push('/recipe');
    };

    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/admin/recipe');
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{title}</h1>
            <p className="text-lg text-gray-600 mb-4 text-center">{description}</p>

            <form onSubmit={handleSubmit}>
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">タイトル</label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded p-3 w-full"
                        value={recipe?.title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">説明</label>
                    <textarea
                        className="border border-gray-300 rounded p-3 w-full"
                        value={recipe?.description}
                        onChange={(e) => setDescription(e.target.value)}
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
                                placeholder="分量"
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
                                className="text-red-500 hover:text-red-700"
                                onClick={() => removeIngredient(index)}
                            >
                                削除
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
                        onClick={addIngredient}
                    >
                        材料を追加
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
            </form>
        </div>
    );
}
