'use client';

import { useState } from "react";

interface KeywordInputProps {
    keywords?: string;
    onChange: (key: keyof Recipe, value: string) => void;
    error?: string;
}

const KeywordInput = ({ keywords, onChange, error }:KeywordInputProps) => {
    const initKeywordArray = keywords ? keywords.split(',').map((keyword) => keyword.trim()) : [];
    const [keywordArray, setKeywordArray] = useState<string[]>(initKeywordArray);
    const [inputValue, setInputValue] = useState<string>('');
    const [isComposing, setIsComposing] = useState<boolean>(false);

    const handleRemoveKeyword = (keywordToRemove: string) => {
        const newKeywords = keywordArray.filter((keyword) => keyword !== keywordToRemove);
        setKeywordArray(newKeywords);
        const newKeywordsString = newKeywords.join(',');
        onChange('keywords', newKeywordsString);
    };

    const handleAddKeyword = () => {
        if (inputValue.trim() && !keywordArray.includes(inputValue.trim())) {
            const newKeywords = [...keywordArray, inputValue.trim()];
            setKeywordArray(newKeywords);
            const newKeywordsString = newKeywords.join(',');
            onChange('keywords', newKeywordsString);
            setInputValue(''); 
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isComposing) {
            e.preventDefault();
            handleAddKeyword();
        }
    };

    const handleCompositionStart = () => {
        setIsComposing(true);
    };

    const handleCompositionEnd = () => {
        setIsComposing(false);
    };

    return (
        <div>
            <div className="flex flex-wrap items-center border border-gray-300 rounded p-2 w-full">
                {keywordArray.map((keyword, index) => (
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
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    placeholder="キーワードを追加"
                    className="flex-grow border-none outline-none p-2"
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
