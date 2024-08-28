'use client';

import React from 'react';

interface StepListProps {
    steps: Step[];
    onAddStep: () => void;
    onRemoveStep: (index: number) => void;
    onChangeStep: (index: number, instruction: string) => void;
}

const StepForm = ({ steps, onAddStep, onRemoveStep, onChangeStep }: StepListProps) => {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">手順</h2>
            {steps.map((step, index) => (
                <div key={index} className="flex items-center mb-4">
                    <textarea
                        placeholder={`手順 ${index + 1}`}
                        className="border border-gray-300 rounded p-3 w-full"
                        value={step.instruction}
                        onChange={(e) => onChangeStep(index, e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="text-xs text-red-500 hover:text-red-700 ml-2"
                        onClick={() => onRemoveStep(index)}
                    >
                        削除
                    </button>
                </div>
            ))}
            <button
                type="button"
                className="bg-blue-500 text-sm text-white rounded px-4 py-2"
                onClick={onAddStep}
            >
                手順を追加
            </button>
        </div>
    );
};

export default StepForm;
