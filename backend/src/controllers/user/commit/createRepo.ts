import { Response } from 'express';
import prisma from '../../../db/db.config';
import { UserRequest } from '../../../types/userType';

export const createRepo = async (req: UserRequest, res: Response) => {
    if (!req.user) {
        return res.status(403).json({ message: 'User not found' });
    }

    const user = await prisma.user.findUnique({
        where: { email: req.user.email },
    });

    if (user) {
        const newRepo = await prisma.repository.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                readme: req.body.readme,
                visibility: req.body.visibility,
                ownerId: user.id,
            },
        });
        res.status(201).json({ message: 'Repository created', data: newRepo.name });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
};
