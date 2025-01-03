

'use client'
import React, { useState } from 'react';
import { useFormContext } from '../FormContext';
import { useRouter } from 'next/navigation';

const Step1 = ({parent}) => {
  const { formData, updateField } = useFormContext();
  const [fieldErrors, setFieldErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);

    // Clear the error for the updated field
    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.fullName) errors.fullName = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.confirmPassword) errors.confirmPassword = 'Confirm Password is required';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (!formData.gender) errors.gender = 'Gender is required';
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of Birth is required';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
    } else {
      router.push('/route/step1');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-md">
      <h2 className="text-2xl font-bold mb-4">Step 1: User Profile</h2>
      <div className={`w-full ${parent === 'view' ? 'hidden' : 'flex'} rounded-md mb-4`}>
        <span className="bg-blue-500 h-[4px] w-1/6"></span>
        <span className="bg-gray-300 h-[4px] w-5/6"></span>
      </div>
      <form onSubmit={handleNext}>
        <label className="block mb-2">
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {fieldErrors.fullName && <p className="text-red-500">{fieldErrors.fullName}</p>}
        </label>

        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {fieldErrors.email && <p className="text-red-500">{fieldErrors.email}</p>}
        </label>

        <label className="block mb-2">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {fieldErrors.password && <p className="text-red-500">{fieldErrors.password}</p>}
        </label>

        <label className="block mb-2">
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {fieldErrors.confirmPassword && <p className="text-red-500">{fieldErrors.confirmPassword}</p>}
        </label>

        <label className="block mb-2">
          Gender:
          <div className="flex space-x-4 mt-1">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
          {fieldErrors.gender && <p className="text-red-500">{fieldErrors.gender}</p>}
        </label>

        <label className="block mb-2">
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {fieldErrors.dateOfBirth && <p className="text-red-500">{fieldErrors.dateOfBirth}</p>}
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

export default Step1;
