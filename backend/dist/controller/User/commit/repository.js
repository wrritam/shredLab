"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMDFile = exports.updateMDFile = exports.readMDfiles = exports.writeMDfiles = exports.deleteRepo = exports.getAllRepos = exports.getTop4Repos = exports.createRepo = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
// Creatung a new repository
const createRepo = async (req, res) => {
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user.email },
    });
    if (user) {
        const newRepo = await db_config_1.default.repository.create({
            data: {
                name: req.body.name,
                readme: req.body.readme,
                ownerId: parseInt(req.params.userid),
            },
        });
        res.status(201).json({ message: "Repository created", data: newRepo.name });
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
};
exports.createRepo = createRepo;
// Get top 4 repositories of the logged in user
const getTop4Repos = async (req, res) => {
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user.email },
    });
    if (user) {
        const repos = await db_config_1.default.repository.findMany({
            where: { ownerId: parseInt(req.params.userid) },
            take: 4,
        });
        res.status(200).json({ message: "Top 4 repositories", data: repos });
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
};
exports.getTop4Repos = getTop4Repos;
// Get a user's all repositories
const getAllRepos = async (req, res) => {
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user.email },
    });
    if (user) {
        const repos = await db_config_1.default.repository.findMany({
            where: { ownerId: user.id },
        });
        res.status(200).json({ message: "All repositories", data: repos });
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
};
exports.getAllRepos = getAllRepos;
// Delete repository by id
const deleteRepo = async (req, res) => {
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user.email },
    });
    if (user) {
        const repo = await db_config_1.default.repository.findUnique({
            where: { id: parseInt(req.params.repid), ownerId: user.id },
        });
        if (repo) {
            const deletedRepo = await db_config_1.default.repository.delete({
                where: { id: parseInt(req.params.repid) },
            });
            res
                .status(200)
                .json({ message: "Repository deleted", data: deletedRepo });
        }
        else {
            res.status(403).json({ message: "Repository not found" });
        }
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
};
exports.deleteRepo = deleteRepo;
// Writing a new MD file in the repository
const writeMDfiles = async (req, res) => {
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user.email },
    });
    if (user) {
        const repo = await db_config_1.default.repository.findUnique({
            where: { id: parseInt(req.params.repid) },
        });
        if (repo) {
            const newMDfile = await db_config_1.default.file.create({
                data: {
                    name: req.body.name,
                    content: req.body.content,
                    creatorId: parseInt(req.params.userid),
                    repositoryId: parseInt(req.params.repoid),
                },
            });
            res
                .status(201)
                .json({ message: "MD file created", data: newMDfile.name });
        }
        else {
            res.status(403).json({ message: "Repository not found" });
        }
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
};
exports.writeMDfiles = writeMDfiles;
// Reading the MD file in the repository
const readMDfiles = async (req, res) => {
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user.email },
    });
    if (user) {
        const repo = await db_config_1.default.repository.findUnique({
            where: { id: parseInt(req.params.repid) },
        });
        if (repo) {
            const file = await db_config_1.default.file.findUnique({
                where: { id: parseInt(req.params.fileid) },
            });
            res.status(200).json({ message: "MD file read", data: file.content });
        }
        else {
            res.status(403).json({ message: "Repository not found" });
        }
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
};
exports.readMDfiles = readMDfiles;
// Updating an existing MD file
const updateMDFile = async (req, res) => {
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user.email },
    });
    if (user) {
        const repo = await db_config_1.default.repository.findUnique({
            where: { id: parseInt(req.params.repoid) },
        });
        if (repo) {
            const file = await db_config_1.default.file.findUnique({
                where: { id: parseInt(req.params.fileid) },
            });
            if (file) {
                const updatedMDfile = await db_config_1.default.file.update({
                    where: { id: parseInt(req.params.fileid) },
                    data: {
                        content: req.body.content,
                    },
                });
                res
                    .status(200)
                    .json({ message: "MD file updated", data: updatedMDfile });
            }
            else {
                res.status(403).json({ message: "File not found" });
            }
        }
        else {
            res.status(403).json({ message: "Repository not found" });
        }
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
};
exports.updateMDFile = updateMDFile;
// Deleting an existing MD file
const deleteMDFile = async (req, res) => {
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user.email },
    });
    if (user) {
        const repo = await db_config_1.default.repository.findUnique({
            where: { id: parseInt(req.params.repoid) },
        });
        if (repo) {
            const file = await db_config_1.default.file.findUnique({
                where: { id: parseInt(req.params.fileid) },
            });
            if (file) {
                const deletedMDfile = await db_config_1.default.file.delete({
                    where: { id: parseInt(req.params.fileid) },
                });
                res
                    .status(200)
                    .json({ message: "MD file deleted", data: deletedMDfile });
            }
            else {
                res.status(403).json({ message: "File not found" });
            }
        }
        else {
            res.status(403).json({ message: "Repository not found" });
        }
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
};
exports.deleteMDFile = deleteMDFile;
//# sourceMappingURL=repository.js.map