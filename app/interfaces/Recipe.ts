interface Recipe {
    id: number;
    title: string;
    description: string;
    genre: string;
    ingredients: Ingredient[];
    steps: Step[];
}