import { Router } from 'express';
import ProductController from '../controllers/productController.js';

const router = Router();

router.get('/', ProductController.getAll);
router.get('/slug/:slug', ProductController.getBySlug);
router.get('/:id', ProductController.getById);

export default router;
