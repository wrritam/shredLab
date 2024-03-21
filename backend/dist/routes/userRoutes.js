"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const register_1 = require("../controller/User/auth/register");
const login_1 = require("../controller/User/auth/login");
const verify_1 = require("../controller/User/auth/verify");
const forgotPassword_1 = require("../controller/User/auth/forgotPassword");
const update_1 = require("../controller/User/auth/update");
const resetPassword_1 = require("../controller/User/auth/resetPassword");
router.post("/register", register_1.register);
router.post("/login", login_1.login);
router.post("/verify-registration", verify_1.verifyRegistration);
router.post("/forgot-password", forgotPassword_1.forgotPassword);
router.post("/verify-updation", update_1.verifyUpdation);
router.post("/reset-password", resetPassword_1.resetPassword);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map