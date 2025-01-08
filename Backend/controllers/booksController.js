import multer from 'multer';
import path from 'path';
import { extractPdfMetadata, extractEpubMetadata } from '../utils/metadataExtractor.js';
import db from '../models/db.js';

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique timestamp
    },
});

const upload = multer({ storage });

// Add a book with file upload
export const addBookWithFile = [
    upload.single('file'),
    async (req, res) => {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = file.path;
        let metadata;

        try {
            // Extract metadata based on file type
            if (file.mimetype === 'application/epub+zip') {
                metadata = await extractEpubMetadata(filePath);
            } else if (file.mimetype === 'application/pdf') {
                metadata = await extractPdfMetadata(filePath);
            } else {
                return res.status(400).json({ error: 'Unsupported file format' });
            }

            console.log('Extracted metadata:', metadata);

            // Save metadata to database
            const result = await db.query(
                'INSERT INTO Books (title, author, series, genre, format, filePath) VALUES (?, ?, ?, ?, ?, ?)',
                [metadata.title, metadata.author, metadata.series, metadata.genre, file.mimetype, filePath]
            );

            res.status(201).json({ id: result[0].insertId, metadata, message: 'Book added successfully!' });
        } catch (error) {
            console.error('Error adding book:', error);
            res.status(500).json({ error: error.message });
        }
    },
];

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const [books] = await db.query(`
            SELECT 
                Title, Author, Series, Genre, Format
            FROM Books
        `);
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
