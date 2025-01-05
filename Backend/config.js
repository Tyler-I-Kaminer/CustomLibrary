require('dotenv').config(); // Load environment variables from .env

// Check if JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment');
}

// Export the configurations
module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT || 3000, // Example of other configurations
};
