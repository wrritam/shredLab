"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRepo = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const deleteRepo = async (req, res) => {
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user.email },
    });
    if (user) {
        const repo = await db_config_1.default.repository.findUnique({
            where: { id: parseInt(req.params.repoid), ownerId: user.id },
        });
        if (repo) {
            const deletedRepo = await db_config_1.default.repository.delete({
                where: { id: parseInt(req.params.repid) },
            });
            res.status(200).json({ message: 'Repository deleted', data: deletedRepo });
        }
        else {
            res.status(403).json({ message: 'Repository not found' });
        }
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
};
exports.deleteRepo = deleteRepo;
//# sourceMappingURL=deleteRepo.js.map