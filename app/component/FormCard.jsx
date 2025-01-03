'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const FormDataCards = ({  }) => {

    const [formDataList, setFormData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router=useRouter()

    const getForm = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/forms', {
            method: 'GET',
          });
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const formsData = await res.json();
          setFormData(formsData.data);
        } catch (e) {
          setError(`Failed to fetch form data: ${e.message}`);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        getForm();
      }, []);
  if (!formDataList || formDataList.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">No form data available.</p>
        <button onClick={getForm}>get</button>
      </div>
    );
  }
  const handleDelete =async (id) => {
    try {
        const res = await fetch(`http://localhost:5000/api/forms/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if(res.status == 200){
            getForm()
        }else{
            alert('Error deleting form')
        }

   }catch(e){
    console.log(e)
   }
  };
  
  const handleUpdate = (index) => {
router.push(`/route/view?id=${index}`);
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {formDataList.map((data, index) => (
        <div
          key={index}
          className="p-4 border border-gray-300 rounded-md shadow-md bg-white"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {data.fullName || 'Name not provided'}
          </h3>

          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Email:</span> {data.email || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Gender:</span> {data.gender || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Phone:</span> {data.phoneNumber || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Address:</span> {data.addressLine1 || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">City:</span> {data.city || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Country:</span> {data.country || 'N/A'}
          </p>

          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Preferred Contact:</span> {data.preferredModeOfContact || 'N/A'}
          </p>

          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Hobbies:</span>{' '}
            {data.hobbiesAndInterests?.length > 0
              ? data.hobbiesAndInterests.join(', ')
              : 'N/A'}
          </p>

          <div className="flex justify-between mt-4">
            <button
              className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => handleUpdate(data._id)}
            >
              Update
            </button>
            <button
              className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={()=> handleDelete(data._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormDataCards;
