'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { useLoading } from '@/app/context/LoadingContext';
import { createOrderFormData, initOrder } from '@/app/models/Order';

interface AiImageRecipeFormProps {
    onAiCreate: (recipe: Recipe) => void;
    onCancel: () => void;
    editRecipe?: Recipe;
}

const AiImageRecipeForm = ({ onAiCreate, onCancel }: AiImageRecipeFormProps) => {
    const { setLoading } = useLoading();

    const [order, setOrder] = useState<Order>(initOrder);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<ErrorMessages>({});

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file); // ファイルをデータURLとして読み込む
        } else {
            setImagePreviewUrl(null);
        }
    };

    const validateForm = () => {
        const newErrors: ErrorMessages = {};
        if (!imageFile) {
            newErrors.general = "画像をアップロードしてください";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAiCreate = async () => {
        if (!validateForm()) return;
        if (!imageFile) return;
        try {
            setLoading(true);
            var data = createOrderFormData(order, imageFile);
            const response = await axios.post('/api/ai/image_recipe',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            console.log(response.data)
            const recipe: Recipe = response.data;

            if (recipe) {
                onAiCreate(recipe);
            } else {
                setErrors({ general: "レシピの作成に失敗しました。" });
            }
        } catch (error) {
            setErrors({ general: "サーバーエラーが発生しました。" });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        onCancel();
    };

    return (
        <div className="mx-auto p-6 bg-white border rounded-lg space-y-6">
            <div>
                {errors.general && (
                    <div className="mb-4 text-red-500 text-sm">
                        {errors.general}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">画像アップロード</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    />
                    {imagePreviewUrl && (
                        <div className="mt-4">
                            <p className="text-sm font-medium mb-2">プレビュー:</p>
                            <img src={imagePreviewUrl} alt="Selected Image" className="max-w-xs max-h-64" />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-center">
                <button onClick={handleAiCreate} type="button" className="mx-1 py-1 px-4 bg-blue-500 text-white rounded-md">
                    作成
                </button>
                <button onClick={handleCancel} type="button" className="mx-1 py-1 px-4 bg-white text-blue-500 border border-blue-500 rounded-md">
                    戻る
                </button>
            </div>
        </div>
    );
};

export default AiImageRecipeForm;