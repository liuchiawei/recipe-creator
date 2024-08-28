interface Recipe {
    id: number;
    title: string;
    description: string;
    genre: string;
    keywords?: string;
    ingredients: Ingredient[];
    steps: Step[];
}