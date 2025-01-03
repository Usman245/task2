'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 text-center mb-4">Form Data Successfully Updated!</h1>
        <p className="text-gray-700 text-center mb-6">
          Your information has been successfully saved. Thank you for updating your details.
        </p>

        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => router.push('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
