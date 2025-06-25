// utils/generateTokens.js
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ _id: userId }, jwtSecret, { expiresIn: "15s" });
    const refreshToken = jwt.sign({ _id: userId }, jwtRefreshSecret, { expiresIn: "1d" });

    return { accessToken, refreshToken };
}

export default generateTokens;