'use client';

import React, { useState } from 'react';

interface KeywordInputProps {
    keywords: string[];
    onKeywordsChange: (keywords: string[]) => void;
    error?: string;
}

const KeywordInput: React.FC<KeywordInputProps> = ({ keywords, onKeywordsChange, error }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) {
            return;
        }

        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            if (!keywords.includes(inputValue.trim())) {
                onKeywordsChange([...keywords, inputValue.trim()]);
            }
            setInputValue('');
        }
    };

    const handleRemoveKeyword = (keywordToRemove: string) => {
        onKeywordsChange(keywords.filter((keyword) => keyword !== keywordToRemove));
    };

    return (
        <div>
            <div className="flex flex-wrap items-center border border-gray-300 rounded p-2 w-full">
                {keywords.map((keyword, index) => (
                    <div key={index} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 m-1 flex items-center">
                        <span>{keyword}</span>
                        <button
                            type="button"
                            className="ml-2 text-gray-500 hover:text-gray-700"
                            onClick={() => handleRemoveKeyword(keyword)}
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="キーワードを入力"
                    className="flex-grow border-none outline-none"
                />
            </div>
            {error && (
                <div className="text-red-500 text-sm mt-1">
                    {error}
                </div>
            )}
        </div>
    );
};

export default KeywordInput;
