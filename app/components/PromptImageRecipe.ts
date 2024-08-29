import { TemplateRecipeJSON } from "./PromptRecipeJSON";

export const createPrompt = () => {
    var prompt = "画像から料理レシピを作成し、JSONフォーマットでレスポンス\n";
    prompt += TemplateRecipeJSON;

    return prompt;
}
