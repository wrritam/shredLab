"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allIssueOnRepo = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const allIssueOnRepo = async (req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: 'User not found' });
    }
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user.email },
    });
    if (user) {
        const repo = await db_config_1.default.repository.findUnique({
            where: { id: parseInt(req.params.repoid) },
        });
        if (repo) {
            const issue = await db_config_1.default.issue.findMany({
                where: { repositoryId: parseInt(req.params.repoid) },
            });
            res.status(200).json({ message: 'Issues found', data: issue.map(i => i.title) });
        }
        else {
            res.status(403).json({ message: 'Repository not found' });
        }
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
};
exports.allIssueOnRepo = allIssueOnRepo;
//# sourceMappingURL=allIssuesOnRepo.js.map