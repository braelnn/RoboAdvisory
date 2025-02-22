const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        // ✅ Check if Authorization header exists
        if (!authHeader) {
            console.error("❌ No Authorization header in request.");
            return res.status(401).json({ error: "Access Denied. No token provided." });
        }

        const token = authHeader.split(" ")[1];

        // ✅ Check if token exists
        if (!token) {
            console.error("❌ Authorization header is invalid.");
            return res.status(401).json({ error: "Access Denied. Token missing." });
        }

        // ✅ Verify the token and extract the user ID
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("❌ Token verification failed:", err.message);
                return res.status(401).json({ error: "Invalid or expired token." });
            }

            if (!decoded.id) {
                console.error("❌ Token does not contain user ID.");
                return res.status(401).json({ error: "Unauthorized: Missing user ID in token." });
            }

            req.user = { id: decoded.id }; // ✅ Attach user ID to request
            console.log("✅ Authenticated User ID:", req.user.id);
            next();
        });
    } catch (error) {
        console.error("❌ Error in authMiddleware:", error.message);
        res.status(500).json({ error: "Server error during authentication." });
    }
};

module.exports = authMiddleware;
