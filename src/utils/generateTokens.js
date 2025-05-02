import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ _id: userId}, jwtSecret, { expiresIn: "1h"});
    const refreshToken = jwt.sign({ _id: userId}, jwtRefreshSecret, { expiresIn: "30d"});

    return { accessToken, refreshToken };
}

export default generateTokens;