export const createPrompt = (order: Order) => {
    var prompt = "つぎの条件で料理レシピを作成\n";
    if (order.genre) prompt += `- ジャンル:${order.genre}\n`
    if (order.timeOfDay) prompt += `- 時間帯:${order.timeOfDay}\n`
    if (order.keywords) prompt += `- キーワード:${order.keywords}\n`
    prompt += "- JSONフォーマットのみでレスポンス([```json]などのマークダウンは除く)\n\n"
    prompt += TemplateJson;

    return prompt;
}

export const TemplateJson: string = `
{
    "title": "xxxxxxxx",
    "description": "xxxxxxxxxxxx",
    "ingredients": [
        {
            "name": "xxxx",
            "quantity": "xxxx",
        },
        {
            "name": "xxxx",
            "quantity": "xxxx",
        }
    ]
    "steps": [
        {
            "stepNumber": 1,
            "instruction": "xxxx",
        },
        {
            "name": 2,
            "instruction": "xxxx",
        }
    ]
}
`;