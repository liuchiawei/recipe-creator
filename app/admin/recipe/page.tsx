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
            <h1 className="text-2xl font-bold mb-4">Recipes</h1>
            <div className="my-3">
                <Link
                    href="/admin/recipe/new"
                    className="text-sm border border-blue-500 text-blue-500 rounded px-4 py-1 my-4"
                >
                    New
                </Link>
            </div>
            <div className="my-3">
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe.id} className="mb-4">
                            <Link
                                href={`/admin/recipe/${recipe.id}/edit`}
                                className="me-3 text-sm text-blue-500 px-4 py-1 my-4"
                            >
                                Edit
                            </Link>
                            <span className="my-3">{recipe.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}