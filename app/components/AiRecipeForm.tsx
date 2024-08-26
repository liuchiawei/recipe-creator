'use client';

import React, { useState } from 'react';

interface TravelFormProps {
    onAiCreate: (order: Order) => void;
    onCancel: () => void;
    editRecipe?: Recipe;
}

const initOrder: Order = {
    timeOfDay: '',
    genre: '',
    keywords: [],
};

const AiRecipeForm: React.FC<TravelFormProps> = ({ onAiCreate, onCancel }) => {
    const [order, setOrder] = useState<Order>(initOrder);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrder(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setOrder(prev => ({
            ...prev,
            keywords: value.split(',').map(keyword => keyword.trim())
        }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAiCreate = async () => {
        if (validateForm()) {
            onAiCreate(order);
        }
    };

    const handleCancel = async () => {
        onCancel();
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
            <div className="">
                <div className="mb-2 py-1 px-2 rounded bg-green-500 text-white text-sm">
                    キーワード
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">時間帯</label>
                <select
                    name="timeOfDay"
                    value={order.timeOfDay}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-full"
                >
                    <option value="">選択してください</option>
                    <option value="朝食">朝食</option>
                    <option value="昼食">昼食</option>
                    <option value="夕食">夕食</option>
                    <option value="軽食">軽食</option>
                    <option value="その他">その他</option>
                </select>
                {order.timeOfDay === 'その他' && (
                    <input
                        type="text"
                        name="timeOfDay"
                        placeholder="その他の時間帯を入力"
                        value={order.timeOfDay}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full mt-2"
                    />
                )}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">ジャンル</label>
                <select
                    name="genre"
                    value={order.genre}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-full"
                >
                    <option value="">選択してください</option>
                    <option value="和食">和食</option>
                    <option value="洋食">洋食</option>
                    <option value="中華">中華</option>
                    <option value="イタリアン">イタリアン</option>
                    <option value="フレンチ">フレンチ</option>
                    <option value="デザート">デザート</option>
                    <option value="その他">その他</option>
                </select>
                {order.genre === 'その他' && (
                    <input
                        type="text"
                        name="genre"
                        placeholder="その他のジャンルを入力"
                        value={order.genre}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full mt-2"
                    />
                )}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">キーワード</label>
                <input
                    type="text"
                    name="keywords"
                    placeholder="カンマ区切りで入力"
                    value={order.keywords?.join(', ') || ''}
                    onChange={handleKeywordsChange}
                    className="border border-gray-300 rounded p-2 w-full"
                />
            </div>

            <div className="flex justify-center">
                <button onClick={handleAiCreate} type="button" className="mx-1 py-2 px-4 bg-blue-500 text-white rounded-md">
                    AI Recipe
                </button>
                <button onClick={handleCancel} type="button" className="mx-1 py-2 px-4 bg-white text-blue-500 border border-blue-500 rounded-md">
                    Close
                </button>
            </div>
        </div>
    );
};

export default AiRecipeForm;
