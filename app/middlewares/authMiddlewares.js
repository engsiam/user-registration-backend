import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authenticate = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token =
            req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: 'Access denied. Please log in first.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        // Check if user still exists
        if (!user) {
            return res
                .status(401)
                .json({ message: 'Invalid token. User no longer exists.' });
        }

        req.user = user; // Attach user data to the request
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res
            .status(401)
            .json({ message: 'Please use a valid login token or log in again.' });
    }
};

export default authenticate;
