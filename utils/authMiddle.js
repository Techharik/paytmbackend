import jwt from 'jsonwebtoken'
import { JWT_TOKEN } from '../config';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(400).json({
            success: false,
            message: 'Invalid token or token not found'
        })
    }
    try {

        let extractedToken = token.replace('Bearer ', '');

        const decodedValue = jwt.verify(extractedToken, JWT_TOKEN)

        req.userId = decodedValue.userId;
        next();

    } catch (e) {
        res.status(403).json({
            message: 'Unknown Error happened loggin Again'
        })
    }
}