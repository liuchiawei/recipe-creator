'use client'

import EditRecipeForm from '@/app/components/EditRecipeForm';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


export default function EditRecipePage({ params }: { params: { id: string } }) {
    const router = useRouter();

    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        async function fetchRecipe() {
            const response = await axios.get(`/api/recipe/${params.id}`);
            if (response.data.error) {
                router.push('/user/recipe');
                return;
            }
            const recipe = response.data;
            console.log(recipe)
            setRecipe(recipe);
        }

        fetchRecipe();
    }, [router, params.id]);

    return (
        <div>
            {recipe &&
                <EditRecipeForm
                    initRecipe={recipe}
                />
            }
        </div>
    );
}
