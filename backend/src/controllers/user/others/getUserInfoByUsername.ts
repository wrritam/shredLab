import { Response } from 'express';
import prisma from '../../../db/db.config';
import { UserRequest } from '../../../types/userType';
import { User } from '@prisma/client';

export const getUserInfoByUsername = async (req: UserRequest, res: Response) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ message: 'Username not provided' });
    }

    const user: User | null = await prisma.user.findUnique({
      where: { username },
      include: {
        commits: true,
        repositoriesOwned: true,
        repositoriesContributed: true,
        issues: true,
        comments: true,
        files: true,
        likedRepo: true,
        PullRequest: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { is_verified, otp, last_login, createdAt, updatedAt, password, id, ...userData } = user;

    res.status(200).json({
      success: true,
      message: 'User information retrieved successfully',
      data: userData,
    });
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};
