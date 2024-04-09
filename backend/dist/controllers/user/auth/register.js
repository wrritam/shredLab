"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sentMail_1 = require("../../../helpers/sentMail");
const db_config_1 = __importDefault(require("../../../db/db.config"));
const sendOTP_1 = require("../../../helpers/sendOTP");
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const mailSubject = 'ShreddLab Account Verification';
const register = async (req, res) => {
    const { name, username, bio, profilePictureUrl, email, password } = req.body;
    const existingUser = await db_config_1.default.user.findUnique({
        where: { email: email },
    });
    if (existingUser) {
        const isUserVerified = existingUser.is_verified;
        if (isUserVerified === false) {
            const randomOTP = (0, sendOTP_1.sendOTP)();
            await db_config_1.default.user.update({
                where: { email: email },
                data: {
                    username: username,
                    name: name,
                    otp: randomOTP,
                    createdAt: new Date().toISOString(),
                },
            });
            const emailTemplatePath = path_1.default.resolve(__dirname, '../../../templates/email.handlebars');
            const emailTemplateSource = fs.readFileSync(emailTemplatePath, 'utf-8');
            const emailTemplate = handlebars_1.default.compile(emailTemplateSource);
            const content = emailTemplate({ randomOTP });
            await (0, sentMail_1.sendMail)(email, mailSubject, content);
            const token = jsonwebtoken_1.default.sign({ email: email, name: name }, process.env.hiddenKey, {
                expiresIn: '1d',
            });
            res.status(200).json({ success: true, message: 'User updated', token: token });
        }
        else {
            res.status(403).json({ success: false, message: 'User already exists', token: null });
        }
    }
    else {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt_1.default.hash(password, 7, (err, hash) => {
                if (err)
                    reject(err);
                else
                    resolve(hash);
            });
        });
        const randomOTP = (0, sendOTP_1.sendOTP)();
        await db_config_1.default.user.create({
            data: {
                username: username,
                bio: bio,
                name: name,
                email: email,
                password: hashedPassword,
                is_verified: false,
                otp: randomOTP,
                createdAt: new Date().toISOString(),
                profilePictureUrl: profilePictureUrl,
            },
        });
        const emailTemplatePath = path_1.default.resolve(__dirname, '../../../templates/email.handlebars');
        const emailTemplateSource = fs.readFileSync(emailTemplatePath, 'utf-8');
        const emailTemplate = handlebars_1.default.compile(emailTemplateSource);
        const content = emailTemplate({ randomOTP });
        await (0, sentMail_1.sendMail)(email, mailSubject, content);
        await db_config_1.default.user.update({
            where: { email: email },
            data: { updatedAt: new Date().toISOString() },
        });
        const token = jsonwebtoken_1.default.sign({ email: email, name: name }, process.env.hiddenKey, {
            expiresIn: '1d',
        });
        res.json({
            success: true,
            message: 'User created successfully',
            token: token,
        });
    }
};
exports.register = register;
//# sourceMappingURL=register.js.map