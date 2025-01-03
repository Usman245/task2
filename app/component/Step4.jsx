'use client'
import React, { useState } from 'react';
import { useFormContext } from '../FormContext'; // Import the context to access form data
import { useRouter } from 'next/navigation';

const Step4 = ({parent}) => {
  const { formData, updateField } = useFormContext();
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);

    // Clear the error for the field being updated
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.monthlyIncome) {
      newErrors.monthlyIncome = 'Monthly income is required';
    }

    if (!formData.loanStatus) {
      newErrors.loanStatus = 'Loan status is required';
    }

    if (formData.loanStatus === 'Yes' && !formData.loanAmount) {
      newErrors.loanAmount = 'Loan amount is required';
    }

    if (!formData.creditScore) {
      newErrors.creditScore = 'Credit score is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      router.push('/route/step4');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-md">
      <h2 className="text-2xl font-bold mb-4">Financial Information</h2>
      <div className={`w-full ${parent === 'view' ? 'hidden' : 'flex'} rounded-md mb-4`}>
        <span className="bg-blue-500 h-[4px] w-4/6"></span>
        <span className="bg-gray-300 h-[4px] w-2/6"></span>
      </div>
      <form onSubmit={handleNext}>
        <label className="block mb-2">
          Monthly Income:
          <input
            type="number"
            name="monthlyIncome"
            value={formData.monthlyIncome || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          <p className="text-red-500">{errors.monthlyIncome}</p>
        </label>

        <label className="block mb-2">
          Loan Status:
          <div className="flex items-center space-x-4 mt-2">
            <label>
              <input
                type="radio"
                name="loanStatus"
                value="Yes"
                checked={formData.loanStatus === 'Yes'}
                onChange={handleChange}
                className="mr-2"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="loanStatus"
                value="No"
                checked={formData.loanStatus === 'No'}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
          </div>
          <p className="text-red-500">{errors.loanStatus}</p>
        </label>

        {formData.loanStatus === 'Yes' && (
          <label className="block mb-2">
            Loan Amount:
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
            <p className="text-red-500">{errors.loanAmount}</p>
          </label>
        )}

        <label className="block mb-2">
          Credit Score:
          <input
            type="number"
            name="creditScore"
            value={formData.creditScore || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          <p className="text-red-500">{errors.creditScore}</p>
        </label>

        <button
          type="submit"
          className={`py-2 px-4 text-white bg-blue-600 hover:bg-blue-800 mt-4 ${parent === 'view'? 'hidden': 'flex'}`}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Step4;