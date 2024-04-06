import express from 'express';
import prisma from '../../../db/db.config';

interface User {
    username: string;
    email: string;
    password: string;
}
interface UserRequest extends express.Request {
    user: User;
}

export const getSingleRepo = async (req: UserRequest, res: express.Response) => {
    const user = await prisma.user.findUnique({
        where: { email: req.user.email },
    });

    if (user) {
        const repos = await prisma.repository.findMany({
            where: { id: parseInt(req.params.repoid) },
        });
        res.status(200).json({ message: 'All repositories', data: repos });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
};
