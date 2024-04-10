import { Response } from 'express';
import prisma from '../../../db/db.config';
import { UserRequest } from '../../../types/userType';

export const updateMDFile = async (req: UserRequest, res: Response) => {
    if (!req.user) {
        return res.status(403).json({ message: 'User not found' });
    }

    const user = await prisma.user.findUnique({
        where: { email: req.user.email },
    });

    if (user) {
        const repo = await prisma.repository.findUnique({
            where: { id: parseInt(req.params.repoid), ownerId: user.id },
        });

        if (repo) {
            const file = await prisma.file.findUnique({
                where: { id: parseInt(req.params.fileid) },
            });

            if (file) {
                const updatedMDfile = await prisma.file.update({
                    where: { id: parseInt(req.params.fileid) },
                    data: {
                        content: req.body.content,
                    },
                });
                res.status(200).json({ message: 'MD file updated', data: updatedMDfile });
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
