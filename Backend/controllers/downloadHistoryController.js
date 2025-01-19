const getDownloadHistory = async (req, res) => {
    const { userID } = req.query;
    const requesterId = req.user.userId;
    const requesterRole = req.user.role;
    const isAdmin = req.user.role === 'admin';

    if (!userID || isNaN(userID)) {
        return res.status(400).json({ message: 'Invalid userID. Must be a numeric value.' });
    }
    
    if (userID !== requesterId && requesterRole !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }

    try {
        const downloadHistory = await db.query(
            'SELECT * FROM DownloadHistory WHERE UserID = ? ORDER BY DownloadDate DESC',
            [userID]
        );
        res.json(downloadHistory[0]);
    } catch (err) {
        console.error('Error fetching download history:', err);
        res.status(500).send('Server error');
    }
};
export default getDownloadHistory;