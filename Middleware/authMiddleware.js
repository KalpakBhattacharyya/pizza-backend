const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided, access denied." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "super_secret_key_123");
        
        req.user = decoded;

        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: "Access denied. Admins only." });
        }
    } catch (err) {
        res.status(403).json({ message: "Invalid token." });
    }
};

module.exports = { isAdmin };