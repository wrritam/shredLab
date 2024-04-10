"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentUnderRepoFile = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const deleteCommentUnderRepoFile = async (req, res) => {
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user?.email },
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
                const findComment = await db_config_1.default.comment.findUnique({
                    where: { id: parseInt(req.params.commentid) },
                });
                if (findComment) {
                    await db_config_1.default.comment.delete({
                        where: { id: findComment.id },
                    });
                    res.status(200).json({ message: 'Comment deleted' });
                }
                else {
                    res.status(403).json({ message: 'Comment not found' });
                }
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
exports.deleteCommentUnderRepoFile = deleteCommentUnderRepoFile;
//# sourceMappingURL=deleteCommentUnderRepoFiles.js.map