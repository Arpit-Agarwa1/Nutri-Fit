import { Router } from 'express';
import ContactController from '../controllers/contactController.js';

const router = Router();

router.post('/', ContactController.create);

export default router;
