'use client';

import React, { useState } from 'react';
import { genres } from '@/app/data/genres';

interface GenreInputProps {
    value?: string;
    onChange: (value: string) => void;
    error?: string;
}

const GenreInput: React.FC<GenreInputProps> = ({ value, onChange, error }) => {
    const [filteredGenres, setFilteredGenres] = useState<string[]>([]);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);

        const filtered = genres.filter((genre) =>
            genre.toLowerCase().includes(newValue.toLowerCase())
        );
        setFilteredGenres(filtered);
    };

    const handleFocus = () => {
        setIsFocused(true);
        setFilteredGenres(genres);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 100);
    };

    const handleGenreSelect = (genre: string) => {
        onChange(genre);
        setFilteredGenres([]);
        setIsFocused(false);
    };

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="ジャンルを入力"
                className="border border-gray-300 rounded p-2 w-full"
            />
            {isFocused && filteredGenres.length > 0 && (
                <ul className="border border-gray-300 rounded p-2 mt-2 bg-white absolute z-10 w-full">
                    {filteredGenres.map((genre) => (
                        <li
                            key={genre}
                            className="cursor-pointer hover:bg-gray-200 p-1"
                            onMouseDown={() => handleGenreSelect(genre)}
                        >
                            {genre}
                        </li>
                    ))}
                </ul>
            )}
            {error && (
                <div className="text-red-500 text-sm mt-1">
                    {error}
                </div>
            )}
        </div>
    );
};

export default GenreInput;
