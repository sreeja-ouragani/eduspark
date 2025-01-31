import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'; // Import the required method for pre-signed URLs
import dotenv from 'dotenv';

dotenv.config();

// Initialize the S3 client with credentials from the environment variables
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to upload a file to S3
const uploadFile = async (bucketName, fileName, fileBuffer, folder) => {
  console.log(`Uploading file to S3:
    Bucket: ${bucketName}, 
    Folder: ${folder}, 
    FileName: ${fileName}`);

  const params = {
    Bucket: bucketName, // Ensure the correct bucket name
    Key: `${folder}/${fileName}`, // File path within the bucket (folder/fileName)
    Body: fileBuffer, // The file buffer being uploaded
    ContentType: 'video/mp4', // Assuming you're uploading mp4 videos
    ACL: 'private', // Set the ACL to private (don't use public-read)
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3.send(command); // Send the upload request
    console.log('Upload Success', data); // Log success response from S3
    return data; // Optionally return the response or file URL
  } catch (err) {
    console.error('Error uploading file:', err); // Log any errors
    throw new Error('Error uploading file'); // Throw an error to be caught by the caller
  }
};

// Function to generate a pre-signed URL for video access
const generatePresignedUrl = async (bucketName, fileName) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileName,
  });

  try {
    // Generate the pre-signed URL valid for 1 hour
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    throw new Error('Error generating pre-signed URL');
  }
};

export { s3, uploadFile, generatePresignedUrl };