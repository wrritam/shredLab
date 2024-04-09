"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRepos = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const getUserRepos = async (req, res) => {
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user.email },
    });
    if (user) {
        const repos = await db_config_1.default.repository.findMany({
            where: { ownerId: user.id },
        });
        res.status(200).json({ message: 'All repositories', data: repos });
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
};
exports.getUserRepos = getUserRepos;
//# sourceMappingURL=getUserRepos.js.map