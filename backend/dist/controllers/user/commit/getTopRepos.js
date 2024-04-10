"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopRepos = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const getTopRepos = async (req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: 'User not found' });
    }
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user.email },
    });
    if (user) {
        const repos = await db_config_1.default.repository.findMany({
            where: { ownerId: user.id },
            take: 4,
        });
        res.status(200).json({ message: 'Top 4 repositories', data: repos });
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
};
exports.getTopRepos = getTopRepos;
//# sourceMappingURL=getTopRepos.js.map