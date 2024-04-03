import express, { Request, Response } from "express";
import prisma from "../../../db/db.config";

interface User {
  username: string;
  email: string;
  password: string;
}
interface UserRequest extends express.Request {
  user: User;
}

// Creatung a new repository

export const createRepo = async (req: UserRequest, res: express.Response) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  });

  if (user) {
    const newRepo = await prisma.repository.create({
      data: {
        name: req.body.name,
        readme: req.body.readme,
        ownerId: user.id,
      },
    });
    res.status(201).json({ message: "Repository created", data: newRepo.name });
  } else {
    res.status(403).json({ message: "User not found" });
  }
};

// Get top 4 repositories of the logged in user

export const getTop4Repos = async (req: UserRequest, res: express.Response) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  });

  if (user) {
    const repos = await prisma.repository.findMany({
      where: { ownerId: user.id },
      take: 4,
    });
    res.status(200).json({ message: "Top 4 repositories", data: repos });
  } else {
    res.status(403).json({ message: "User not found" });
  }
};

// Get a user's all repositories

export const myRepos = async (req: UserRequest, res: express.Response) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  });

  if (user) {
    const repos = await prisma.repository.findMany({
      where: { ownerId: user.id },
    });
    res.status(200).json({ message: "All repositories", data: repos });
  } else {
    res.status(403).json({ message: "User not found" });
  }
};

// get any repository

export const getRepo = async (req: UserRequest, res: express.Response) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  });

  if (user) {
    const repos = await prisma.repository.findMany({
      where: { id: parseInt(req.params.repoid) },
    });
    res.status(200).json({ message: "All repositories", data: repos });
  } else {
    res.status(403).json({ message: "User not found" });
  }
};

// Delete repository by id

export const deleteRepo = async (req: UserRequest, res: express.Response) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  });

  if (user) {
    const repo = await prisma.repository.findUnique({
      where: { id: parseInt(req.params.repoid), ownerId: user.id },
    });

    if (repo) {
      const deletedRepo = await prisma.repository.delete({
        where: { id: parseInt(req.params.repid) },
      });
      res
        .status(200)
        .json({ message: "Repository deleted", data: deletedRepo });
    } else {
      res.status(403).json({ message: "Repository not found" });
    }
  } else {
    res.status(403).json({ message: "User not found" });
  }
};

// Writing a new MD file in the repository

export const writeMDfiles = async (req: UserRequest, res: express.Response) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  });

  if (user) {
    const repo = await prisma.repository.findUnique({
      where: { id: parseInt(req.params.repoid), ownerId: user.id },
    });

    if (repo) {
      const newMDfile = await prisma.file.create({
        data: {
          name: req.body.name,
          content: req.body.content,
          creatorId: user.id,
          repositoryId: parseInt(req.params.repoid),
        },
      });
      res
        .status(201)
        .json({ message: "MD file created", data: newMDfile.name });
    } else {
      res.status(403).json({ message: "Repository not found" });
    }
  } else {
    res.status(403).json({ message: "User not found" });
  }
};

// Reading the MD file in the repository

export const readMDfiles = async (req: UserRequest, res: express.Response) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  });

  if (user) {
    const repo = await prisma.repository.findUnique({
      where: { id: parseInt(req.params.repoid) },
    });

    if (repo) {
      const file = await prisma.file.findUnique({
        where: { id: parseInt(req.params.fileid) },
      });
      res.status(200).json({ message: "MD file read", data: file.content });
    } else {
      res.status(403).json({ message: "Repository not found" });
    }
  } else {
    res.status(403).json({ message: "User not found" });
  }
};

// Updating an existing MD file

export const updateMDFile = async (req: UserRequest, res: express.Response) => {
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
        res
          .status(200)
          .json({ message: "MD file updated", data: updatedMDfile });
      } else {
        res.status(403).json({ message: "File not found" });
      }
    } else {
      res.status(403).json({ message: "Repository not found" });
    }
  } else {
    res.status(403).json({ message: "User not found" });
  }
};

// Deleting an existing MD file

export const deleteMDFile = async (req: UserRequest, res: express.Response) => {
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
        const deletedMDfile = await prisma.file.delete({
          where: { id: parseInt(req.params.fileid) },
        });
        res
          .status(200)
          .json({ message: "MD file deleted", data: deletedMDfile });
      } else {
        res.status(403).json({ message: "File not found" });
      }
    } else {
      res.status(403).json({ message: "Repository not found" });
    }
  } else {
    res.status(403).json({ message: "User not found" });
  }
};
