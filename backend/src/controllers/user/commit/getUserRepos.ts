import { Response } from 'express';
import prisma from '../../../db/db.config';
import { UserRequest } from '../../../types/userType';

export const getUserRepos = async (req: UserRequest, res: Response) => {
    if (!req.user) {
        return res.status(403).json({ message: 'User not found' });
    }

    const user = await prisma.user.findUnique({
        where: { email: req.user.email },
    });

    if (user) {
        const repos = await prisma.repository.findMany({
            where: { ownerId: user.id },
        });
        res.status(200).json({ message: 'All repositories', data: repos });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
};
