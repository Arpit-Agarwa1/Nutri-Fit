import { Router } from 'express';
import OrderController from '../controllers/orderController.js';

const router = Router();

router.post('/', OrderController.create);
router.get('/:id', OrderController.getById);

export default router;
