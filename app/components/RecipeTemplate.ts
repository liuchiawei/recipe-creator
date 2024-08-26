export const createPrompt = (recipe: any) => {
    var prompt = "つぎの条件で料理レシピを作成し、 JSONフォーマットのみでレスポンス\n[```json]などのマークダウンは除く\n\n"
    prompt += TemplateJson;
    return prompt;
}

export const TemplateJson: string = `
{
    "title": "xxxxxxxx",
    "description": "xxxxxxxxxxxx",
    "ingredients": [
        [
            {
                "name": "xxxx",
                "quantity": "xxxx",
            },
            {
                "name": "xxxx",
                "quantity": "xxxx",
            }
        ],
    ]
    "steps": [
        [
            {
                "stepNumber": 1,
                "instruction": "xxxx",
            },
            {
                "name": 2,
                "instruction": "xxxx",
            }
        ],
    ]
}
`;