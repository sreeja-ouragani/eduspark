import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to check if the user is an admin
const adminMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ error: 'Access denied, no token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by decoded user ID
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied, admin privileges required' });
    }

    req.user = user; // Attach user data to request
    next(); // Continue to the next middleware/route handler
  } catch (error) {
    res.status(403).json({ error: 'Invalid token or no access rights' });
  }
};

export default adminMiddleware;
