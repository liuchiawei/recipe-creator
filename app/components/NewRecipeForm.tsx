'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewRecipeForm() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    const [steps, setSteps] = useState([{ instruction: '' }]);

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    const addStep = () => {
        setSteps([...steps, { instruction: '' }]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post('/api/recipe/create', {
                title,
                description,
                ingredients,
                steps,
            });
            router.push('/admin/recipe');
        } catch (error) {
            console.error('Error submitting the recipe:', error);
        }
    };

    const handleCancel = async (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/admin/recipe');
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">新しいレシピ</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">タイトル</label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded p-2 w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">説明</label>
                    <textarea
                        className="border border-gray-300 rounded p-2 w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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

                <div className="mb-4">
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

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-4 py-2"
                    >
                        保存
                    </button>

                    <button
                        type="button"
                        className="border border-blue-500 text-blue-500 rounded px-4 py-2 mt-2"
                        onClick={handleCancel}
                    >
                        戻る
                    </button>
                </div>
            </form>
        </div>
    );
}
