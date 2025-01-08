import jwt from 'jsonwebtoken';

// Middleware to verify token
export default function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Extract UserID from token payload
        req.userRole = decoded.role;
        next();
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }
}

// Middleware for role-based authorization
export const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).send('Access denied');
        }
        next();
    };
};
