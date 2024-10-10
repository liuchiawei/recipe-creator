import { TemplateRecipeJSON } from "./PromptRecipeJSON";

export const createPrompt = () => {
    var prompt = "画像から料理レシピ（日本語）を作成し、JSONフォーマットでレスポンス\n";
    prompt += TemplateRecipeJSON;

    return prompt;
}
