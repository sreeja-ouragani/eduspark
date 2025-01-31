import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware
import multer from 'multer';
import { s3, uploadFile, generatePresignedUrl } from './aws-config.js'; // Import S3 functions
import { ListObjectsV2Command } from '@aws-sdk/client-s3'; // AWS SDK command to list objects
import authRoute from './routes/authRoute.js'; // Authentication routes
import adminRoutes from './routes/adminRoutes.js'; // Admin-specific routes

dotenv.config();

// Log environment variables for debugging
console.log("MongoDB URI:", process.env.MONGODB_URI);
console.log("AWS Bucket Name:", process.env.AWS_BUCKET_NAME);  // Log AWS Bucket Name
console.log("AWS Region:", process.env.AWS_REGION);  // Log AWS Region
console.log("AWS Access Key ID:", process.env.AWS_ACCESS_KEY_ID);  // Log AWS Access Key ID

const app = express();
const port = 5000; // Changed the port to 5000

// Middleware for parsing JSON data and handling CORS
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow both origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// MongoDB connection for login/signup functionality
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes for authentication (login/signup)
app.use('/auth', authRoute);  // Authentication routes
app.use('/admin', adminRoutes);  // Admin-specific routes

// Middleware for file uploads using multer
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint for uploading a video
app.post('/upload-video', upload.single('video'), async (req, res) => {
  console.log("Received file:", req.file);  // Log file details
  console.log("Folder:", req.body.folder);  // Log the folder value

  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const folder = req.body.folder;
  const fileName = req.file.originalname;
  const fileBuffer = req.file.buffer;

  if (!folder || !fileName || !fileBuffer) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const uploadResponse = await uploadFile(
      process.env.AWS_BUCKET_NAME,
      fileName,
      fileBuffer,
      folder
    );

    console.log('S3 upload response:', uploadResponse);

    res.status(200).send({
      message: 'File uploaded successfully',
      data: uploadResponse,
    });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).send('Error uploading file');
  }
});

// API to fetch videos for the selected folder (subject)
app.get('/videos/:folder', async (req, res) => {
  const folder = req.params.folder;  // Get folder (subject) from URL params
  const bucketName = process.env.AWS_BUCKET_NAME;

  const params = {
    Bucket: bucketName,
    Prefix: `${folder}/`, // Folder prefix for the selected subject
  };

  console.log("Requested folder:", req.params.folder);  // Log the folder name
  console.log("Bucket Name:", bucketName);            // Log the bucket name
  console.log("S3 Prefix:", params.Prefix);           // Log the prefix used in the S3 query

  try {
    const { Contents } = await s3.send(new ListObjectsV2Command(params));

    if (!Contents || Contents.length === 0) {
      return res.status(404).json({ message: 'No videos found for this subject' });
    }

    const videos = Contents.map((video) => {
      return video.Key.split('/').pop();  // Extract file name from the S3 path
    });

    res.json({ videos });  // Return the list of video filenames to the frontend
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Error fetching videos' });
  }
});

// API endpoint to handle fetching video URL for a specific file
app.get('/videos/:folder/:fileName', async (req, res) => {
  const { folder, fileName } = req.params;
  const bucketName = process.env.AWS_BUCKET_NAME; // Use environment variable for bucket name

  try {
    const filePath = `${folder}/${fileName}`; // Construct the file path (e.g., telugu/video1.mp4)
    const presignedUrl = await generatePresignedUrl(bucketName, filePath); // Generate pre-signed URL
    res.json({ url: presignedUrl }); // Return the URL to the front-end
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    res.status(500).json({ error: 'Error generating pre-signed URL' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
