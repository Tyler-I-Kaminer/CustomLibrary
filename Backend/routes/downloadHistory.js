const express = require('express');
const router = express.Router();
const downloadHistoryController = require('../controllers/downloadHistoryController');
const { verifyToken } = require('../middleware/authMiddleware');

// Fetch download history (protected route)
router.get('/', verifyToken, downloadHistoryController.getDownloadHistory);

module.exports = router;
