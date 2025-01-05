const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

// Define routes
router.get('/', booksController.getAllBooks); // Fetch all books
router.post('/', booksController.addBook);    // Add a new book

module.exports = router;
