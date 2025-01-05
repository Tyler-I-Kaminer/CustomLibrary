const db = require('../models/db');

// Fetch all books
exports.getAllBooks = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Books');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Add a new book
exports.addBook = async (req, res) => {
    const { title, author, genre } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO Books (title, author, genre) VALUES (?, ?, ?)',
            [title, author, genre]
        );
        res.status(201).json({ id: result[0].insertId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
