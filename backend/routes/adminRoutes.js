import express from 'express';
import adminMiddleware from '../middleware/adminMiddleware.js'; // Ensure the correct path with .js extension
const router = express.Router();

// Admin-only route to access admin dashboard
router.get('/admin-dashboard', adminMiddleware, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

export default router;
