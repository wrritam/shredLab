"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMDFile = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const deleteMDFile = async (req, res) => {
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
            const file = await db_config_1.default.file.findUnique({
                where: { id: parseInt(req.params.fileid) },
            });
            if (file) {
                const deletedMDfile = await db_config_1.default.file.delete({
                    where: { id: parseInt(req.params.fileid) },
                });
                res.status(200).json({ message: 'MD file deleted', data: deletedMDfile });
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
exports.deleteMDFile = deleteMDFile;
//# sourceMappingURL=deleteMDFile.js.map