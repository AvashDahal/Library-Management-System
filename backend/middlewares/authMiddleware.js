
import jwt from 'jsonwebtoken';


const authMiddleware = async (req, res, next) => {
    const auhHeader = req.headers.authorization;
    const token = auhHeader && auhHeader.split(' ')[1];
    console.log(token);

    if (!token) {
        return res.status(401).json({ error: 'Token not found' });
    }
    console.log("auth");

    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next()
}

export default authMiddleware;