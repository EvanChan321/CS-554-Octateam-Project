import express from 'express';
import { createList, editList, deleteList, viewList, publishList } from '../controllers/listController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createList);
router.put('/edit/:listId', authMiddleware, editList);
router.delete('/delete/:listId', authMiddleware, deleteList);
router.get('/view/:listId', viewList);
router.post('/publish/:listId', authMiddleware, publishList);

export default router;
