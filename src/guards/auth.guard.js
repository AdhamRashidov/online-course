import config from '../config/index.js';
import token from '../utils/Token.js';
import { AppError } from '../error/AppError.js';

export const AuthGuard = async (req, res, next) => {
    try {
        const auth = req.headers?.authorization;
        if (!auth) {
            throw new AppError('Authorization error', 401);
        }
        const bearer = auth.split(' ')[0];
        const authToken = auth.split(' ')[1];
        if (bearer !== 'Bearer' || !authToken) {
            throw new AppError('UnAuthorization', 401);
        }
        const user = token.verifyToken(authToken, config.TOKEN.ACCESS_TOKEN_KEY);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}