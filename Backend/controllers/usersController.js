const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config'); // Adjust the path to config.js
// Fetch all users
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Users');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Reigster user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the plain text password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user to the database
        const result = await db.query(
            'INSERT INTO Users (Username, Email, PasswordHash) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully', userId: result[0].insertId });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Server error');
    }
};



exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch the user by email
        const [rows] = await db.query('SELECT * FROM Users WHERE Email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const user = rows[0];

        // Compare the plain text password with the bcrypt hash
        const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password'),
                console.log('Email provided for login:', email),
                console.log('Provided Password:', password), // Plain text password from the request
                console.log('Stored Hash from DB:', user.PasswordHash); // Hashed password from the database

        }



        // Generate a JWT token
        const token = jwt.sign(
            { userId: user.UserID, role: user.Role }, // Include role
            jwtSecret,
            { expiresIn: '1h' }
        );
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Server error');
    }
};
