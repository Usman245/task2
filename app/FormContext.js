'use client'
import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Step 1: User Profile
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: '',

    // Step 2: Contact Information
    phoneNumber: '',
    alternatePhoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: '',

    // Step 3: Employment Information
    currentJobTitle: '',
    employmentStatus: '',
    companyName: '',
    yearsOfExperience: '',
    resume: null,
    studyofField:'',
    startDate: '',
    endDate: '',

    // Step 4: Financial Information
    monthlyIncome: '',
    loanStatus: '',
    loanAmount: '',
    creditScore: '',

    // Step 5: Preferences
    preferredModeOfContact: '',
    hobbiesAndInterests: [],
    newsletterSubscription: false,
  });

  const updateField = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateField }}>
      {children}
    </FormContext.Provider>
  );
};
