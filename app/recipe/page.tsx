'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        async function fetchRecipes() {
            const response = await fetch('/api/recipes');
            const data = await response.json();
            setRecipes(data);
        }

        fetchRecipes();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Recipes</h1>
            <div className="my-3">
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe.id} className="py-2 border-b">
                            <Link
                                href={`/recipe/${recipe.id}`}
                                className="me-3 text-sm text-blue-500 px-4 py-1 my-4"
                            >
                                {recipe.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}