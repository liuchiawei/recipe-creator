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
    keywords: [],
};

const AiRecipeForm = ({ onAiCreate, onCancel }: AiRecipeFormProps) => {
    const { setLoading } = useLoading();
    const [order, setOrder] = useState<Order>(initOrder);
    const [errors, setErrors] = useState<ErrorMessages>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrder(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenreChange = (genre: string) => {
        setOrder(prev => ({
            ...prev,
            genre,
        }));
    };

    const handleTimeOfDay = (timeOfDay: string) => {
        setOrder(prev => ({
            ...prev,
            timeOfDay,
        }));
    };

    const handleKeywordsChange = (keywords: string[]) => {
        setOrder(prev => ({
            ...prev,
            keywords,
        }));
    };

    const validateForm = () => {
        const newErrors: ErrorMessages = {};

        if (!order.timeOfDay) {
            newErrors.timeOfDay = '時間帯を選択してください。';
        }

        if (!order.genre) {
            newErrors.genre = 'ジャンルを選択してください。';
        }

        if (order.keywords?.length === 0) {
            newErrors.keywords = '1つ以上のキーワードを入力してください。';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAiCreate = async () => {
        if (!validateForm()) return;
        try {
            setLoading(true);
            const response = await axios.post('/api/ai/recipe', order);
            const recipe: Recipe = response.data;

            if (recipe && recipe.ingredients && recipe.steps) {
                onAiCreate(recipe);
            } else {
                const newErrors: ErrorMessages = {};
                newErrors.general = "レシピの作成に失敗しました。";
                setErrors(newErrors);
            }
        } catch (error) {
            const newErrors: ErrorMessages = {};
            newErrors.general = "サーバーエラーが発生しました。";
            setErrors(newErrors);
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
                        onChange={handleGenreChange}
                        error={errors.genre}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">時間帯</label>
                    <TimeOfDayInput
                        value={order.timeOfDay}
                        onChange={handleTimeOfDay}
                        error={errors.timeOfDay}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">キーワード</label>
                    <KeywordInput
                        keywords={order.keywords || []}
                        onKeywordsChange={handleKeywordsChange}
                        error={errors.keywords}
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
