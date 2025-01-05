import express from 'express';
import usersController from '../controllers/usersController.js';

const router = express.Router();

// Access properties from the default export
router.get('/', usersController.getAllUsers);
router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);

export default router; // Default export
