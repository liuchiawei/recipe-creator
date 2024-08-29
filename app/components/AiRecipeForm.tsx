'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { useLoading } from '@/app/context/LoadingContext';
import GenreInput from '@/app/components/GenreInput';
import TimeOfDayInput from '@/app/components/TimeOfDayInput';
import KeywordInput from '@/app/components/KeywordInput';

interface AiRecipeFormProps {
    onAiCreate: (recipe: Recipe) => void;
    onCancel: () => void;
    editRecipe?: Recipe;
}

const initOrder: Order = {
    timeOfDay: '',
    genre: '',
    keywords: '',
    image: null,
};

const AiRecipeForm = ({ onAiCreate, onCancel }: AiRecipeFormProps) => {
    const { setLoading } = useLoading();

    const [order, setOrder] = useState<Order>(initOrder);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<ErrorMessages>({});

    const handleInputChange = (key: string, value: string) => {
        setOrder(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);
    };

    const validateForm = () => {
        const newErrors: ErrorMessages = {};

        // if (!order.timeOfDay) {
        //     newErrors.timeOfDay = '時間帯を選択してください。';
        // }

        // if (!order.genre) {
        //     newErrors.genre = 'ジャンルを選択してください。';
        // }

        // if (order.keywords?.length === 0) {
        //     newErrors.keywords = '1つ以上のキーワードを入力してください。';
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createFormData = () => {
        const formData = new FormData();
        formData.append('timeOfDay', order.timeOfDay || '');
        formData.append('genre', order.genre || '');
        formData.append('keywords', order.keywords || '');
        if (imageFile) {
            formData.append('image', imageFile);
        }
        return formData;
    }
    const handleAiCreate = async () => {
        if (!validateForm()) return;
        try {
            setLoading(true);

            //TODO: Service
            const response = await axios.post('/api/ai/recipe', 
                createFormData(),
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            console.log(response.data)
            const recipe: Recipe = response.data;

            if (recipe && recipe.ingredients && recipe.steps) {
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
                    <label className="block text-sm font-medium mb-2">ジャンル</label>
                    <GenreInput
                        value={order.genre}
                        onChange={handleInputChange}
                        error={errors.genre}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">時間帯</label>
                    <TimeOfDayInput
                        value={order.timeOfDay}
                        onChange={handleInputChange}
                        error={errors.timeOfDay}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">キーワード</label>
                    <KeywordInput
                        keywords={order?.keywords}
                        onChange={handleInputChange}
                        error={errors.keywords}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">画像アップロード</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    />
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

export default AiRecipeForm;
