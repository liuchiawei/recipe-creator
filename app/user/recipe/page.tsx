'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        async function fetchRecipes() {
            const response = await axios.get('/api/recipe/get');
            setRecipes(response.data);
        }
        fetchRecipes();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-center font-bold mb-4">レシピ作成</h1>
            <div className="my-3">
                <Link
                    href="/user/recipe/new"
                    className="me-3 text-sm border border-blue-500 text-blue-500 rounded px-4 py-1 my-4"
                >
                    追加
                </Link>
                <Link
                    href="/user/recipe/ai"
                    className="me-3 text-sm border border-blue-500 text-blue-500 rounded px-4 py-1 my-4"
                >
                    AIレシピ作成
                </Link>
                <Link
                    href="/user/recipe/ai_image"
                    className="text-sm border border-blue-500 text-blue-500 rounded px-4 py-1 my-4"
                >
                    画像でレシピ作成
                </Link>
            </div>
            <div className="my-3">
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe.id} className="mb-4">
                            <Link
                                href={`/user/recipe/${recipe.id}/edit`}
                                className="me-3 text-sm text-blue-500 px-4 py-1 my-4"
                            >
                                編集
                            </Link>
                            <span className="mx-3 px-3 py-1 bg-blue-500 text-white text-xs rounded">
                                {recipe.genre}
                            </span>
                            <span className="my-3">{recipe.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}