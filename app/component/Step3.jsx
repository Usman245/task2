'use client'
import { useFormContext } from '@/app/FormContext';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Step3 = ({parent}) => {
  const { formData, updateField } = useFormContext();
  const router = useRouter();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);

    // Clear the error for the field being updated
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
      setIsFileSelected(true);
      updateField('resume',uploadedFile)
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.employmentStatus) {
      newErrors.employmentStatus = 'Employment status is required';
    }

    if (formData.employmentStatus === 'Employed') {
      if (!formData.currentJobTitle) newErrors.currentJobTitle = 'Job title is required';
      if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
      if (!formData.companyName) newErrors.companyName = 'Company name is required';
    }

    if (formData.employmentStatus === 'Student') {
      if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'Field of study is required';
      if (!formData.educationStartDate) newErrors.educationStartDate = 'Education start date is required';
      if (!formData.educationEndDate) newErrors.educationEndDate = 'Education end date is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      router.push('/route/step3');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-md">
      <h2 className="text-2xl font-bold mb-4">Employment History</h2>
      <div className={`w-full ${parent === 'view' ? 'hidden' : 'flex'} rounded-md mb-4`}>
        <span className="bg-blue-500 h-[4px] w-3/6"></span>
        <span className="bg-gray-300 h-[4px] w-3/6"></span>
      </div>
      <form onSubmit={handleNext}>
        <label className="block mb-2">
          Employment Status:
          <select
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Select Employment Status</option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Student">Student</option>
          </select>
          <p className="text-red-500">{errors.employmentStatus}</p>
        </label>

        {formData.employmentStatus === 'Employed' && (
          <>
            <label className="block mb-2">
              Job Title:
              <input
                type="text"
                name="currentJobTitle"
                value={formData.currentJobTitle}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
              <p className="text-red-500">{errors.currentJobTitle}</p>
            </label>

            <label className="block mb-2">
              Years of Experience:
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
              <p className="text-red-500">{errors.yearsOfExperience}</p>
            </label>

            <label className="block mb-2">
              Company Name:
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
              <p className="text-red-500">{errors.companyName}</p>
            </label>
          </>
        )}

        {formData.employmentStatus === 'Student' && (
          <>
            <label className="block mb-2">
              Field Of Study:
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
              <p className="text-red-500">{errors.fieldOfStudy}</p>
            </label>

            <label className="block mb-2">
              Education Start Date:
              <input
                type="date"
                name="educationStartDate"
                value={formData.educationStartDate}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
              <p className="text-red-500">{errors.educationStartDate}</p>
            </label>

            <label className="block mb-2">
              Education End Date:
              <input
                type="date"
                name="educationEndDate"
                value={formData.educationEndDate}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
              <p className="text-red-500">{errors.educationEndDate}</p>
            </label>
          </>
        )}

<div>
      {/* Displaying the file input */}
      {!isFileSelected && (
        <input 
          type="file" 
          accept=".pdf,.doc,.docx,.txt" 
          onChange={handleFileChange} 
          className="border p-2"
        />
      )}

      {/* File preview (only shown after file is selected) */}
      {isFileSelected && (
        <div className="file-preview">
          <p>{fileName}</p> {/* Display file name */}
          {/* You can add an icon or image preview if needed */}
        </div>
      )}

      {/* Button to remove the file and reset the input */}
      {isFileSelected && (
        <button
          onClick={() => {
            setFile(null);
            setFileName("");
            setIsFileSelected(false);
          }}
          className="mt-2 p-2 bg-red-500 text-white"
        >
          Remove File
        </button>
      )}
    </div>

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

export default Step3;
