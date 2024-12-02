import express from 'express';
import { getCategory ,getItemsByCategory,saveSelection} from '../controllers/userController.js';
const router = express.Router()


router.get('/categories', getCategory);
router.get('/categories/:categoryId/items', getItemsByCategory);
router.post('/save', saveSelection);

export default router
