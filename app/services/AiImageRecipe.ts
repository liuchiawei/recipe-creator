const { GoogleAIFileManager } = require("@google/generative-ai/server");

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-1.5-flash';

async function uploadToGemini(path: String, mimeType: String) {
    const fileManager = new GoogleAIFileManager(API_KEY);
    const uploadResult = await fileManager.uploadFile(path, {
        mimeType,
        displayName: path,
    });
    const file = uploadResult.file;
    return file;
}

const generationConfig = {
    temperature: 2,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 1024,
    responseMimeType: "text/plain",
};

async function run() {
    if (!API_KEY) return;

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL, });
    const files = [
        await uploadToGemini("image_cook_helper1.jpeg", "image/jpeg"),
    ];

    const prompt = `写真の材料で料理のリストとレシピを作成してください。`;

    const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    {
                        fileData: {
                            mimeType: files[0].mimeType,
                            fileUri: files[0].uri,
                        },
                    },
                    { text: prompt },
                ],
            },
        ],
    });

    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
}

run();