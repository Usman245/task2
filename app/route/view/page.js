'use client'
import Step1 from '@/app/component/Step1'
import Step2 from '@/app/component/Step2'
import Step3 from '@/app/component/Step3'
import Step4 from '@/app/component/Step4'
import Step5 from '@/app/component/Step5'
import React, { useEffect } from 'react'
import { FormContext, useFormContext } from '../../FormContext';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
const page = () => {
  const { formData, updateField } = useFormContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const handleSubmit = async (e) => {
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // Handle arrays like hobbies or files separately
      if (Array.isArray(value)) {
        value.forEach((item) => formDataToSend.append(key, item));
      } else if (key === 'resume' && value instanceof File) {
        formDataToSend.append(key, value); // File upload
      } else {
        formDataToSend.append(key, value);
      }
    });


    // Perform the fetch request
    const res = await fetch('http://localhost:5000/api/forms', {
      method: 'POST',
      body: formDataToSend  // Pass the formData directly as the body
      // No need to set Content-Type header, browser will automatically set it
    });

    // Handle the response (you can add this part if necessary)
    if (res.ok) {
      router.push('/route/success');
    } else {
      console.error('Error:', res.statusText);
    }
  };

  const getForm= async ()=>{
    try{
      const res = await fetch(`http://localhost:5000/api/forms/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if(res.status === 200){
        console.log('Success')
        const data=await res.json()
        for (const [key, value] of Object.entries(data)) {
          updateField(key, value); // Update the field using the key from the response
        }
      }
    }catch(e){
      alert('network error')
    }
  }

  useEffect(()=>{
    getForm()

  },[id])

  const handleUpdate = async (e) => {
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // Handle arrays like hobbies or files separately
      if (Array.isArray(value)) {
        value.forEach((item) => formDataToSend.append(key, item));
      } else if (key === 'resume' && value instanceof File) {
        formDataToSend.append(key, value); // File upload
      } else {
        formDataToSend.append(key, value);
      }
    });
    try {
      // Perform the fetch request
      const res = await fetch(`http://localhost:5000/api/forms/${id}`, {
        method: 'PUT',
        body: formDataToSend  // Pass the formData directly as the body
      });

      // Handle the response
      if (res.ok) {
        router.push('/route/success');
      } else {
        console.error('Error:', res.statusText);
      }
    } catch (error) {
      console.error('Error in updating form:', error);
    }
  };

  return (
    <div className='p-6 max-w-lg mx-auto bg-white shadow-md rounded-md'>
      <Step1 parent='view' />
      <Step2 parent='view' />
      <Step3 parent='view' />
      <Step4 parent='view' />
      <Step5 parent='view' />
      <button
        type="submit"
        className="py-2 px-4 text-white bg-blue-600 hover:bg-blue-800 mt-4"
        onClick={()=>{
          if(id){
            handleUpdate()
          }else{
            handleSubmit()
          }
        }}
      >
        Save Changes
      </button>
    </div>
  )
}

export default page


