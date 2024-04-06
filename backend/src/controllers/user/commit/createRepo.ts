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

export const createRepo = async (req: UserRequest, res: express.Response) => {
    const user = await prisma.user.findUnique({
        where: { email: req.user.email },
    });

    if (user) {
        const newRepo = await prisma.repository.create({
            data: {
                name: req.body.name,
                readme: req.body.readme,
                ownerId: user.id,
            },
        });
        res.status(201).json({ message: 'Repository created', data: newRepo.name });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
};
