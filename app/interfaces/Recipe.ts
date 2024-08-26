interface Recipe {
    id: number;
    title: string;
    description: string;
    ingredients: Ingredient[];
    steps: Step[];
}