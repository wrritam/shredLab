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

export const commentUnderRepoFile = async (req: UserRequest, res: express.Response) => {
    const { comment } = req.body;
    const user = await prisma.user.findUnique({
        where: { email: req.user.email },
    });

    if (user) {
        const repo = await prisma.repository.findUnique({
            where: { id: parseInt(req.params.repoid) },
        });

        if (repo) {
            const file = await prisma.file.findUnique({
                where: { id: parseInt(req.params.fileid), repositoryId: repo.id },
            });

            if (file) {
                const addComment = await prisma.comment.create({
                    data: {
                        comment: comment,
                        authorId: user.id,
                        repositoryId: repo.id,
                        fileId: file.id,
                        createdAt: new Date().toISOString(),
                    },
                });
                res.status(201).json({ message: 'Comment created', data: addComment.comment });
            } else {
                res.status(403).json({ message: 'File not found' });
            }
        } else {
            res.status(403).json({ message: 'Repository not found' });
        }
    } else {
        res.status(403).json({ message: 'User not found' });
    }
};
