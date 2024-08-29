import { TemplateRecipeJSON } from "./PromptRecipeJSON";

export const createPrompt = (order: Order) => {
    var prompt = "つぎの条件で料理レシピを作成し、JSONフォーマットでレスポンス\n";
    if (order.genre) prompt += `- ジャンル:${order.genre}\n`
    if (order.timeOfDay) prompt += `- 時間帯:${order.timeOfDay}\n`
    if (order.keywords) prompt += `- キーワード:${order.keywords}\n`
    prompt += TemplateRecipeJSON;

    return prompt;
}
