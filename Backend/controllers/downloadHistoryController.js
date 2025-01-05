import db from '../models/db.js';


// Fetch download history (for authenticated user only)
export const getDownloadHistory = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Pagination parameters
    const UserID = req.userId; // Extracted from JWT middleware

    try {
        // Calculate pagination offset
        const offset = (page - 1) * limit;

        // Base query to fetch download history for the authenticated user
        const query = `
            SELECT 
                dh.DownloadID, 
                dh.DownloadDate, 
                dh.Format, 
                u.Username AS UserName, 
                b.Title AS BookTitle
            FROM DownloadHistory dh
            JOIN Users u ON dh.UserID = u.UserID
            JOIN Books b ON dh.BookID = b.BookID
            WHERE dh.UserID = ?
            ORDER BY dh.DownloadDate DESC
            LIMIT ? OFFSET ?
        `;

        const params = [UserID, parseInt(limit), parseInt(offset)];

        // Execute the query
        const [rows] = await db.query(query, params);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching download history:', error);
        res.status(500).send('Server error');
    }
};
