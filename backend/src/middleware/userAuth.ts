import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserRequest } from '../types/userType';

export const authentication = (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.hiddenKey as string, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user as User;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
