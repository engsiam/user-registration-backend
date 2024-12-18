import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authenticate = async (req, res, next) => {
    try {
        // Extract the token from the "Authorization" header or cookies
        const token =
            req.cookies.token ||
            req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user data to the request
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }

        next(); // Pass control to the next middleware
    } catch (err) {
        console.error('Auth Middleware Error:', err.message);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authenticate;
