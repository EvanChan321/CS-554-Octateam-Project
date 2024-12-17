import express from 'express';
import { getAllPublishedLists, viewPublishedList, commentOnPublishedList, ratePublishedList } from '../controllers/forumController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPublishedLists);
router.get('/:listId', viewPublishedList);
router.post('/:listId/comment', authMiddleware, commentOnPublishedList);
router.post('/:listId/rate', authMiddleware, ratePublishedList);

export default router;
