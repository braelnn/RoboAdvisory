const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        // ✅ Check if Authorization header exists
        if (!authHeader) {
            return res.status(401).json({ error: 'Access Denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];

        // ✅ Check if token exists
        if (!token) {
            return res.status(401).json({ error: 'Access Denied. Token missing.' });
        }

        // ✅ Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("🔒 Token verification failed:", err.message);
                return res.status(401).json({ error: 'Invalid or expired token.' });
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error("❌ Error in authMiddleware:", error.message);
        res.status(500).json({ error: 'Server error during authentication.' });
    }
};

module.exports = authMiddleware; // ✅ Ensure correct export
