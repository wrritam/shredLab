"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMDFile = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const updateMDFile = async (req, res) => {
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
                const updatedMDfile = await db_config_1.default.file.update({
                    where: { id: parseInt(req.params.fileid) },
                    data: {
                        content: req.body.content,
                    },
                });
                res.status(200).json({ message: 'MD file updated', data: updatedMDfile });
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
exports.updateMDFile = updateMDFile;
//# sourceMappingURL=updateMDFile.js.map