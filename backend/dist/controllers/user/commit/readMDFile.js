"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMDfiles = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const readMDfiles = async (req, res) => {
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
            res.status(200).json({ message: 'MD file read', data: file.content });
        }
        else {
            res.status(403).json({ message: 'Repository not found' });
        }
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
};
exports.readMDfiles = readMDfiles;
//# sourceMappingURL=readMDFile.js.map