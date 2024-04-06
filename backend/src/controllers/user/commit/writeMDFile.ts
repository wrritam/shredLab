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

export const writeMDfiles = async (req: UserRequest, res: express.Response) => {
    const user = await prisma.user.findUnique({
        where: { email: req.user.email },
    });

    if (user) {
        const repo = await prisma.repository.findUnique({
            where: { id: parseInt(req.params.repoid), ownerId: user.id },
        });

        if (repo) {
            const newMDfile = await prisma.file.create({
                data: {
                    name: req.body.name,
                    content: req.body.content,
                    creatorId: user.id,
                    repositoryId: parseInt(req.params.repoid),
                },
            });
            res.status(201).json({ message: 'MD file created', data: newMDfile.name });
        } else {
            res.status(403).json({ message: 'Repository not found' });
        }
    } else {
        res.status(403).json({ message: 'User not found' });
    }
};
