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

    let visibility: boolean;
    if (req.body.visibility === 'Public') {
        visibility = true;
    } else {
        visibility = false;
    }

    if (user) {
        const newRepo = await prisma.repository.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                readme: req.body.readme,
                visibility: visibility,
                ownerId: user.id,
            },
        });
        res.status(201).json({ success: true, message: 'Repository created', name: newRepo.name });
    } else {
        res.status(403).json({ success: false, message: 'User not found', name: null });
    }
};
