'use client';

import Link from 'next/link';

interface RecipeListProps {
    recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
    return (
        <ul>
            {recipes.map((recipe) => (
                <li key={recipe.id} className="py-2 border-b">
                    <Link
                        href={`/recipe/${recipe.id}`}
                        className="me-3 text-gray-500 px-4 py-1 my-4"
                    >
                        {recipe.title}
                    </Link>
                    <span className="mx-3 px-3 py-1 bg-blue-500 text-white text-xs rounded">
                        {recipe.genre}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default RecipeList;