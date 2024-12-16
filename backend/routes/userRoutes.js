import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);

export default router;
