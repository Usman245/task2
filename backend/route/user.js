const express = require('express');
const multer = require('multer');
const Form = require('../sechema/user'); // Assuming the schema is in ../models/Form

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Directory for storing uploaded resumes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST /api/forms - Save form data and upload resume
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const formData = req.body;

    // If a resume file is uploaded, include its path
    if (req.file) {
      formData.resume = req.file.path;
    }
console.log(formData)
    const newForm = new Form(formData);
    await newForm.save();

    res.status(201).json({ message: 'Form data saved successfully!', data: newForm });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save form data', details: error.message });
  }
});

// GET /api/forms - Retrieve all form data
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json({ data: forms });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve form data', details: error.message });
  }
});

// PUT /api/forms/:id - Update form data by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    console.log(updatedData);

    const updatedForm = await Form.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedForm) {
      return res.status(404).json({ error: 'Form data not found' });
    }

    res.status(200).json({ message: 'Form data updated successfully!', data: updatedForm });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update form data', details: error.message });
  }
});

// DELETE /api/forms/:id - Delete form data by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, 'delete');

    const deletedForm = await Form.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({ error: 'Form data not found' });
    }

    res.status(200).json({ message: 'Form data deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete form data', details: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the form by ID
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ error: 'Form data not found' });
    }

    // Return the form data
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch form data', details: error.message });
  }
});


module.exports = router;
