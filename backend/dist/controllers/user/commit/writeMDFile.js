"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeMDfiles = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const writeMDfiles = async (req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: 'User not found' });
    }
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user.email },
    });
    if (user) {
        const repo = await db_config_1.default.repository.findUnique({
            where: { id: parseInt(req.params.repoid), ownerId: user.id },
        });
        if (repo) {
            const newMDfile = await db_config_1.default.file.create({
                data: {
                    name: req.body.name,
                    content: req.body.content,
                    creatorId: user.id,
                    repositoryId: parseInt(req.params.repoid),
                },
            });
            res.status(201).json({ message: 'MD file created', data: newMDfile.name });
        }
        else {
            res.status(403).json({ message: 'Repository not found' });
        }
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
};
exports.writeMDfiles = writeMDfiles;
//# sourceMappingURL=writeMDFile.js.map