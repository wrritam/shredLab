import express from "express";
const router = express.Router();
import { register } from "../controller/User/auth/register";
import { login } from "../controller/User/auth/login";
import { verifyRegistration } from "../controller/User/auth/verify";
import { forgotPassword } from "../controller/User/auth/forgotPassword";
import { verifyUpdation } from "../controller/User/auth/update";
import { resetPassword } from "../controller/User/auth/resetPassword";
import { createRepo } from "../controller/User/commit/repository";
import { getTop4Repos } from "../controller/User/commit/repository";
import { myRepos } from "../controller/User/commit/repository";
import { deleteRepo } from "../controller/User/commit/repository";
import { getRepo } from "../controller/User/commit/repository";
import { writeMDfiles } from "../controller/User/commit/repository";
import { readMDfiles } from "../controller/User/commit/repository";
import { updateMDFile } from "../controller/User/commit/repository";
import { deleteMDFile } from "../controller/User/commit/repository";
import { authentication } from "../middleware/userAuth";

//Authentication
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/verify-registration", verifyRegistration);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/verify-updation", verifyUpdation);
router.post("/auth/reset-password", resetPassword);

//Repository
router.post("/create-repo", authentication, createRepo);
router.get("/get-top-4-repos", authentication, getTop4Repos);
router.get("/my-repos", authentication, myRepos);
router.delete("/:repoid/delete-repo", authentication, deleteRepo);
router.get("/:repoid", authentication, getRepo);
router.post("/:repoid/write-md-files", authentication, writeMDfiles);
router.get("/:repoid/md-files/:fileid", authentication, readMDfiles);
router.put("/:repoid/md-files/:fileid", authentication, updateMDFile);
router.delete("/:repoid/md-files/:fileid", authentication, deleteMDFile);

export default router;
