exports.getDownloadHistory = async (req, res) => {
    const { userId } = req.query; // Get userId from query string
    const requesterId = req.userId; // Get userId from token
    const requesterRole = req.userRole;

    // Ensure userId is provided
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    // Authorization check
    if (requesterRole !== 'admin' && userId !== requesterId) {
        return res.status(403).json({ error: 'Access denied' });
    }

    try {
        const downloadHistory = await db.query(
            'SELECT * FROM DownloadHistory WHERE UserID = ? ORDER BY DownloadDate DESC',
            [userId]
        );
        res.json(downloadHistory[0]);
    } catch (err) {
        console.error('Error fetching download history:', err);
        res.status(500).send('Server error');
    }
};
