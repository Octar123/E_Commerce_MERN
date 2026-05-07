import express from 'express';
import { authorize, protect } from '../middlewares/authMiddleware.js';
import { createProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/',protect, authorize('vendor', 'admin'),  createProduct);

export default router;