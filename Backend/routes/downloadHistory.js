import express from 'express';
import { getDownloadHistory } from '../controllers/downloadHistoryController.js';
import verifyToken from '../middleware/authMiddleware.js'; // Default import
import { authorizeRole } from '../middleware/authMiddleware.js'; // Named import

const router = express.Router();

router.get('/', verifyToken, getDownloadHistory);

export default router;
