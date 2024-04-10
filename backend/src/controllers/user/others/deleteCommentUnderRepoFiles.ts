import { Response } from 'express';
import prisma from '../../../db/db.config';
import { UserRequest } from '../../../types/userType';

export const deleteCommentUnderRepoFile = async (req: UserRequest, res: Response) => {
    const user = await prisma.user.findUnique({
        where: { email: req.user?.email },
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
                const findComment = await prisma.comment.findUnique({
                    where: { id: parseInt(req.params.commentid) },
                });

                if (findComment) {
                    await prisma.comment.delete({
                        where: { id: findComment.id },
                    });
                    res.status(200).json({ message: 'Comment deleted' });
                } else {
                    res.status(403).json({ message: 'Comment not found' });
                }
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
