import express from 'express';
import { authorize, protect } from '../middlewares/authMiddleware.js';
import { createProduct, getProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/',protect, authorize('vendor', 'admin'),  createProduct);

export default router;