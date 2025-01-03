'use client';
import React, { useState } from 'react';
import { useFormContext } from '../FormContext';
import { useRouter } from 'next/navigation';

const Step5 = ({parent}) => {
  const { formData, updateField } = useFormContext(); // Access and update form data
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'hobbies') {
      const currentHobbies = formData.hobbiesAndInterests || [];
      const updatedHobbies = checked
        ? [...currentHobbies, value] // Add hobby if checked
        : currentHobbies.filter((hobby) => hobby !== value); // Remove hobby if unchecked
      updateField('hobbiesAndInterests', updatedHobbies);
    } else {
      updateField(name, type === 'checkbox' ? checked : value);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.preferredModeOfContact) {
      setMessage('Preferred mode of contact is required');
    } else {
      console.log(formData);
      router.push('/route/view');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-md">
      <h2 className="text-2xl font-bold mb-4">Preferences</h2>
      <div className={`w-full ${parent === 'view' ? 'hidden' : 'flex'} rounded-md mb-4`}>
        <span className="bg-blue-500 h-[4px] w-5/6"></span>
        <span className="bg-gray-300 h-[4px] w-1/6"></span>
      </div>
      <form onSubmit={handleNext}>
        <label className="block mb-2">
          Preferred Mode of Contact:
          <div className="flex items-center space-x-4 mt-2">
            <label>
              <input
                type="radio"
                name="preferredModeOfContact"
                value="Email"
                checked={formData.preferredModeOfContact === 'Email'}
                onChange={handleChange}
                className="mr-2"
              />
              Email
            </label>
            <label>
              <input
                type="radio"
                name="preferredModeOfContact"
                value="Phone"
                checked={formData.preferredModeOfContact === 'Phone'}
                onChange={handleChange}
                className="mr-2"
              />
              Phone
            </label>
            <label>
              <input
                type="radio"
                name="preferredModeOfContact"
                value="SMS"
                checked={formData.preferredModeOfContact === 'SMS'}
                onChange={handleChange}
                className="mr-2"
              />
              SMS
            </label>
          </div>
        </label>

        <label className="block mb-2">
          Hobbies and Interests:
          <div className="flex flex-wrap mt-2 space-x-4">
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="Sports"
                checked={formData.hobbiesAndInterests?.includes('Sports')}
                onChange={handleChange}
                className="mr-2"
              />
              Sports
            </label>
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="Music"
                checked={formData.hobbiesAndInterests?.includes('Music')}
                onChange={handleChange}
                className="mr-2"
              />
              Music
            </label>
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="Reading"
                checked={formData.hobbiesAndInterests?.includes('Reading')}
                onChange={handleChange}
                className="mr-2"
              />
              Reading
            </label>
          </div>
        </label>

        <label className="block mb-2">
          Newsletter Subscription:
          <input
            type="checkbox"
            name="newsletterSubscription"
            checked={formData.newsletterSubscription || false}
            onChange={handleChange}
            className="ml-2"
          />
        </label>

        <div>
          <p className="text-red-500">{message}</p>
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

export default Step5;
