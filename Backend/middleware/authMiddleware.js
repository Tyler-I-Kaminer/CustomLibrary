const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    // Extract the Authorization header
    const authHeader = req.headers['authorization'];

    // Check if the Authorization header exists and is properly formatted
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send('No token provided');
    }

    // Extract the token from the "Bearer <token>" format
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded payload (e.g., userId) to the request object
        req.userId = decoded.userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message); // Debugging log
        return res.status(401).send('Unauthorized');
    }
};

exports.authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        // Check the user's role from the JWT payload
        if (req.user.role !== requiredRole) {
            return res.status(403).send('Access denied');
        }
        next();
    };
};