import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/db.js';
import config from '../config.js';
const jwtSecret = config.jwtSecret;

const getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Users');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username or email already exists
        const [existingUser] = await db.query(
            'SELECT * FROM Users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const [result] = await db.query(
            'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM Users WHERE Email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password');
        }

        const token = jwt.sign(
            {
                userId: user.UserID,
                role: user.Role, 
                username: user.Username,
            },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Server error');
    }
};

export default {
    getAllUsers,
    registerUser,
    loginUser,
};
