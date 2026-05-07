import express from 'express';
import { createCategory, getCategories } from '../controllers/categoryController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', protect, authorize('admin'), createCategory);

export default router;