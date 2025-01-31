import mongoose from 'mongoose';
import s3 from './config/awsConfig.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
