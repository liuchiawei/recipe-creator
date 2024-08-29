'use client';

import React, { useState } from 'react';
import { timeOfDays } from '@/app/data/timeOfDays';

interface TimeOfDayInputProps {
    value?: string;
    onChange: (key: string, value: string) => void;
    error?: string;
}

const TimeOfDayInput: React.FC<TimeOfDayInputProps> = ({ value, onChange, error }) => {
    const [filteredGenres, setFilteredGenres] = useState<string[]>([]);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange('timeOfDay', newValue);

        const filtered = timeOfDays.filter((timeOfDays) =>
            timeOfDays.toLowerCase().includes(newValue.toLowerCase())
        );
        setFilteredGenres(filtered);
    };

    const handleFocus = () => {
        setIsFocused(true);
        setFilteredGenres(timeOfDays);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 100);
    };

    const handleGenreSelect = (timeOfDays: string) => {
        onChange('timeOfDay', timeOfDays);
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
                placeholder="時間帯を入力"
                className="border border-gray-300 rounded p-2 w-full"
            />
            {isFocused && filteredGenres.length > 0 && (
                <ul className="border border-gray-300 rounded p-2 mt-2 bg-white absolute z-10 w-full">
                    {filteredGenres.map((timeOfDays) => (
                        <li
                            key={timeOfDays}
                            className="cursor-pointer hover:bg-gray-200 p-1"
                            onMouseDown={() => handleGenreSelect(timeOfDays)}
                        >
                            {timeOfDays}
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

export default TimeOfDayInput;
