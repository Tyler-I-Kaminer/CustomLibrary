import express from 'express';
import  getDownloadHistory  from '../controllers/downloadHistoryController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        await getDownloadHistory(req, res);
    } catch (err) {
        console.error('Error fetching download history:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;