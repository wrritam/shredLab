"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRepo = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const createRepo = async (req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: 'User not found' });
    }
    const user = await db_config_1.default.user.findUnique({
        where: { email: req.user.email },
    });
    if (user) {
        const newRepo = await db_config_1.default.repository.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                readme: req.body.readme,
                visibility: req.body.visibility,
                ownerId: user.id,
            },
        });
        res.status(201).json({ message: 'Repository created', data: newRepo.name });
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
};
exports.createRepo = createRepo;
//# sourceMappingURL=createRepo.js.map