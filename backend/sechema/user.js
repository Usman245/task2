// Import Mongoose
const mongoose = require('mongoose');

// Define the User Profile Schema
const userProfileSchema = new mongoose.Schema({
  // User Profile Information
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },

  // Contact Information
  phoneNumber: {
    type: String,
    required: true,
  },
  alternatePhoneNumber: {
    type: String,
    default: null,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  // Employment Information
  currentJobTitle: {
    type: String,
    default: null,
  },
  employmentStatus: {
    type: String,
    enum: ['Employed', 'Unemployed', 'Student'],
  },
  companyName: {
    type: String,
    default: null,
  },
  yearsOfExperience: {
    type: Number,
    default: 0,
  },
  resume: {
    type: String, // Store the file path
    default: null,
  },

  // Financial Information
  monthlyIncome: {
    type: Number,
    default: 0,
  },
  loanStatus: {
    type: String,
  },
  loanAmount: {
    type: Number,
    default: null,
  },
  creditScore: {
    type: Number,
    default: null,
  },

  // Preferences
  preferredModeOfContact: {
    type: String,
    enum: ['Email', 'Phone', 'SMS'],
    required: true,
  },
  hobbiesAndInterests: {
    type: [String],
    default: [],
  },
  newsletterSubscription: {
    type: String,
    default: false,
  },
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('UserProfile', userProfileSchema);
