import nextConnect from 'next-connect'
import multer from 'multer';
import Form from '../../../schema/user'; // Update the path to your schema

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Next.js serves files from the public directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect({
  onError: (err, req, res) => {
    res.status(500).json({ error: 'Something went wrong!', details: err.message });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
});

// Middleware for file upload
apiRoute.use(upload.single('resume'));

// POST /api/forms
apiRoute.post(async (req, res) => {
  try {
    const formData = req.body;

    // If a resume file is uploaded, include its path
    if (req.file) {
      formData.resume = `/uploads/${req.file.filename}`;
    }

    const newForm = new Form(formData);
    await newForm.save();

    res.status(201).json({ message: 'Form data saved successfully!', data: newForm });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save form data', details: error.message });
  }
});

// GET /api/forms
apiRoute.get(async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json({ data: forms });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve form data', details: error.message });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disables default body parser to handle file uploads
  },
};
