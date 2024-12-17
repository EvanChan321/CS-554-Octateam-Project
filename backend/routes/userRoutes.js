import express from 'express';
import { registerUser, loginUser, uploadProfilePicture, getUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Upload profile picture
router.post('/upload-profile-picture', authMiddleware, upload.single('profilePicture'), uploadProfilePicture);

// Get user profile
router.get('/profile', authMiddleware, getUserProfile);

export default router;
