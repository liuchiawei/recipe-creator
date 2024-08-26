import EditRecipeForm from '@/app/components/EditRecipeForm';

export default function EditRecipePage({ params }: { params: { id: string } }) {
    return (
        <div>
            <EditRecipeForm recipeId={params.id} />
        </div>
    );
}
