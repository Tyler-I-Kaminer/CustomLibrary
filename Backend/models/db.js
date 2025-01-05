import mysql from 'mysql2/promise';

// Configure the database connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Flung6738~9432!1',
    database: 'LibraryDB',
});

export default db; // Default export