import express from 'express';
import { getAllBooks, addBookWithFile } from '../controllers/booksController.js';

const router = express.Router();

// Define routes
router.get('/', getAllBooks); // Get all books
router.post('/upload', addBookWithFile); // Add book with file upload

export default router; // Default export
