const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',     // Replace with your MySQL host
    user: 'root',          // Replace with your MySQL username
    password: 'Flung6738~9432!1',  // Replace with your MySQL password
    database: 'LibraryDB', // The database you created earlier
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
