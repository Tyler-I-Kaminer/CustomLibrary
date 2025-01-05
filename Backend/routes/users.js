const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Routes
router.get('/', usersController.getAllUsers); // Fetch all users
router.post('/register', usersController.registerUser); //Register new user
router.post('/login', usersController.loginUser);

module.exports = router;

