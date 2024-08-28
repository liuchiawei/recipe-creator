'use client';

import React from 'react';
import { useLoading } from '@/app/context/LoadingContext';
import { FaSpinner } from 'react-icons/fa';

const Loading: React.FC = () => {
    const { loading } = useLoading();

    if (!loading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                <FaSpinner className="animate-spin text-blue-500" size={50} />
                <p className="mt-4">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;