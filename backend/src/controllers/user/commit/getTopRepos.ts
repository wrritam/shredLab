import { Response } from 'express';
import prisma from '../../../db/db.config';
import { UserRequest } from '../../../types/userType';

export const getTopRepos = async (req: UserRequest, res: Response) => {
    if (!req.user) {
        return res.status(403).json({ message: 'User not found' });
    }
    const { username } = req.params;

    const user = await prisma.user.findUnique({
        where: { username: us },
    });

    if (user) {
        const repos = await prisma.repository.findMany({
            where: { ownerId: user.id },
            take: 4,
        });
        res.status(200).json({ message: 'Top 4 repositories', data: repos });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
};
