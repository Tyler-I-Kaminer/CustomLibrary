const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/users'); // Import users route
const downloadHistoryRoutes = require('./routes/downloadHistory');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/books', booksRoutes);
app.use('/users', usersRoutes); // Register the users route
app.use('/download-history', downloadHistoryRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
