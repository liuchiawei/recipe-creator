import React from 'react';

interface Step {
    stepNumber: number;
    instruction: string;
}

interface StepsProps {
    steps: Step[];
}

export default function StepList({ steps }: StepsProps) {
    return (
        <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">作り方</h2>
            <ul className="list-none space-y-2">
                {steps.map((step) => (
                    <li key={step.stepNumber} className="flex items-start text-sm text-gray-700">
                        <div>
                            <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-blue-500 rounded-full mr-4">
                                {step.stepNumber}
                            </span>
                        </div>
                        <div>
                            {step.instruction}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
