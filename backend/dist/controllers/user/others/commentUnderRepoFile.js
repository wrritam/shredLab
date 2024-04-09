"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentUnderRepoFile = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const commentUnderRepoFile = async (req, res) => {
    const { comment } = req.body;
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user.email },
    });
    if (user) {
        const repo = await db_config_1.default.repository.findUnique({
            where: { id: parseInt(req.params.repoid) },
        });
        if (repo) {
            const file = await db_config_1.default.file.findUnique({
                where: { id: parseInt(req.params.fileid), repositoryId: repo.id },
            });
            if (file) {
                const addComment = await db_config_1.default.comment.create({
                    data: {
                        comment: comment,
                        authorId: user.id,
                        repositoryId: repo.id,
                        fileId: file.id,
                        createdAt: new Date().toISOString(),
                    },
                });
                res.status(201).json({ message: 'Comment created', data: addComment.comment });
            }
            else {
                res.status(403).json({ message: 'File not found' });
            }
        }
        else {
            res.status(403).json({ message: 'Repository not found' });
        }
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
};
exports.commentUnderRepoFile = commentUnderRepoFile;
//# sourceMappingURL=commentUnderRepoFile.js.map