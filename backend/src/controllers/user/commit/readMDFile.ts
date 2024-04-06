import express, { Request, Response } from 'express';
import prisma from '../../../db/db.config';

interface User {
    username: string;
    email: string;
    password: string;
}
interface UserRequest extends express.Request {
    user: User;
}

export const readMDfiles = async (req: UserRequest, res: express.Response) => {
    const user = await prisma.user.findUnique({
        where: { email: req.user.email },
    });

    if (user) {
        const repo = await prisma.repository.findUnique({
            where: { id: parseInt(req.params.repoid) },
        });

        if (repo) {
            const file = await prisma.file.findUnique({
                where: { id: parseInt(req.params.fileid) },
            });
            res.status(200).json({ message: 'MD file read', data: file.content });
        } else {
            res.status(403).json({ message: 'Repository not found' });
        }
    } else {
        res.status(403).json({ message: 'User not found' });
    }
};
