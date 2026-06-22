const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        let token = req.cookies.token;
        
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            }
        }

        if (!token) {
            return res.status(401).json({ message: 'No authentication token, authorization denied' });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET || 'supersecretzerodhaclonekey');
        if (!verified) {
            return res.status(401).json({ message: 'Token verification failed, authorization denied' });
        }

        req.user = verified.id;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = auth;
