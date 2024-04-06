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

export const deleteRepo = async (req: UserRequest, res: express.Response) => {
    const user = await prisma.user.findUnique({
        where: { email: req.user.email },
    });

    if (user) {
        const repo = await prisma.repository.findUnique({
            where: { id: parseInt(req.params.repoid), ownerId: user.id },
        });

        if (repo) {
            const deletedRepo = await prisma.repository.delete({
                where: { id: parseInt(req.params.repid) },
            });
            res.status(200).json({ message: 'Repository deleted', data: deletedRepo });
        } else {
            res.status(403).json({ message: 'Repository not found' });
        }
    } else {
        res.status(403).json({ message: 'User not found' });
    }
};
