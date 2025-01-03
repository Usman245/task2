'use client'
import React, { useState } from 'react';
import { useFormContext } from '../FormContext';
import { useRouter } from 'next/navigation';

const Step2 = ({parent}) => {
  const { formData, updateField } = useFormContext();
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);

    // Clear the error for the updated field
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.phoneNumber) {
      validationErrors.phoneNumber = 'Primary phone number is required';
    }
    if (!formData.addressLine1) {
      validationErrors.addressLine1 = 'At least one address line is required';
    }
    if (!formData.city) {
      validationErrors.city = 'Choose your city';
    }
    if (!formData.postalCode) {
      validationErrors.postalCode = 'Postal code is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      router.push('/route/step2');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-md">
      <h2 className="text-2xl font-bold mb-4">Step 2: Contact</h2>
      <div className={`w-full ${parent === 'view' ? 'hidden' : 'flex'} rounded-md mb-4`}>
        <span className="bg-blue-500 h-[4px] w-2/6"></span>
        <span className="bg-gray-300 h-[4px] w-4/6"></span>
      </div>
      <form onSubmit={handleNext}>
        <label className="block mb-2">
          Phone No:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </label>

        <label className="block mb-2">
          Alternative Phone (optional):
          <input
            type="text"
            name="alternatePhoneNumber"
            value={formData.alternatePhoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          Address:
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.addressLine1 && <p className="text-red-500 text-sm">{errors.addressLine1}</p>}
        </label>

        <label className="block mb-2">
          Address Line 2 (optional):
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </label>

        <label className="block mb-2">
          Postal Code:
          <input
            type="number"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
        </label>

        <label className="block mb-2">
          Country:
          <select
            name="country"
            id="country"
            onChange={handleChange}
            value={formData.country}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="pakistan">Pakistan</option>
            <option value="india">India</option>
            <option value="united-states">United States</option>
            <option value="uk">United Kingdom</option>
          </select>
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

export default Step2;
