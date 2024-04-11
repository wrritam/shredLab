import { Response } from 'express';
import prisma from '../../../db/db.config';
import { UserRequest } from '../../../types/userType';
import { User } from '@prisma/client';

export const getUserInfo = async (req: UserRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(403).json({ message: 'User not found' });
        }

        const user: User | null = await prisma.user.findUnique({
            where: { email: req.user.email },
        });

        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }
        const { username, email, profilePictureUrl, name, bio } = user;

        res.status(200).json({
            success: true,
            message: 'User information retrieved successfully',
            data: {
                username,
                email,
                profilePictureUrl,
                name,
                bio,
            },
        });
    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
};
