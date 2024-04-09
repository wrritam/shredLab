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
exports.forgotPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sentMail_1 = require("../../../helpers/sentMail");
const db_config_1 = __importDefault(require("../../../db/db.config"));
const sendOTP_1 = require("../../../helpers/sendOTP");
const handlebars_1 = __importDefault(require("handlebars"));
const fs = __importStar(require("fs"));
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await db_config_1.default.user.findUnique({ where: { email: email } });
    if (user && user.is_verified === true) {
        const randomOTP = (0, sendOTP_1.sendOTP)();
        const otpUpdated = await db_config_1.default.user.update({
            where: { email: email },
            data: { otp: randomOTP },
        });
        const token = jsonwebtoken_1.default.sign({ email: email }, process.env.hiddenKey, {
            expiresIn: "1d",
        });
        const emailTemplateSource = fs.readFileSync('../../../templates/email.handlebars', 'utf-8');
        const emailTemplate = handlebars_1.default.compile(emailTemplateSource);
        const content = emailTemplate({ randomOTP });
        (0, sentMail_1.sendMail)(email, "Forgot Password?", content);
        if (otpUpdated) {
            res.json({ message: "Verified", token: token });
        }
        else {
            res.json({ message: "Error", token: null });
        }
    }
    else {
        res.json({ message: "User not verified or registered", token: null });
    }
};
exports.forgotPassword = forgotPassword;
//# sourceMappingURL=forgotPassword.js.map