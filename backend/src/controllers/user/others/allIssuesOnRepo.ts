import { Response } from 'express';
import prisma from '../../../db/db.config';
import { UserRequest } from '../../../types/userType';

export const allIssueOnRepo = async (req: UserRequest, res: Response) => {
    if (!req.user) {
        return res.status(403).json({ message: 'User not found' });
    }

    const user = await prisma.user.findUnique({
        where: { email: req.user.email },
    });

    if (user) {
        const repo = await prisma.repository.findUnique({
            where: { id: parseInt(req.params.repoid) },
        });

        if (repo) {
            const issue = await prisma.issue.findMany({
                where: { repositoryId: parseInt(req.params.repoid) },
            });
            res.status(200).json({ message: 'Issues found', data: issue.map(i => i.title) });
        } else {
            res.status(403).json({ message: 'Repository not found' });
        }
    } else {
        res.status(403).json({ message: 'User not found' });
    }
};
