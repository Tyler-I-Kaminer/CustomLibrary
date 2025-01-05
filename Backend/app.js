import express from 'express';
import cors from 'cors';

import booksRoutes from './routes/books.js';
import usersRoutes from './routes/users.js';
import downloadHistoryRoutes from './routes/downloadHistory.js';

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve uploaded files as static resources

// Routes
app.use('/books', booksRoutes);
app.use('/users', usersRoutes);
app.use('/download-history', downloadHistoryRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
