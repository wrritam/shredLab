import express from "express";
const router = express.Router();
import { register } from "../controller/User/auth/register";
import { login } from "../controller/User/auth/login";
import { verifyRegistration } from "../controller/User/auth/verify";
import { forgotPassword } from "../controller/User/auth/forgotPassword";
import { verifyUpdation } from "../controller/User/auth/update";
import { resetPassword } from "../controller/User/auth/resetPassword";

router.post("/register", register);
router.post("/login", login);
router.post("/verify-registration", verifyRegistration);
router.post("/forgot-password", forgotPassword);
router.post("/verify-updation", verifyUpdation);
router.post("/reset-password", resetPassword);

export default router;
