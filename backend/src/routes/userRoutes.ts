import express from "express";
const router = express.Router();
import { register } from "../controllers/user/auth/register";
import { login } from "../controllers/user/auth/login";
import { verifyRegistration } from "../controllers/user/auth/verify";
import { forgotPassword } from "../controllers/user/auth/forgotPassword";
import { verifyUpdation } from "../controllers/user/auth/update";
import { resetPassword } from "../controllers/user/auth/resetPassword";
import { createRepo } from "../controllers/user/commit/createRepo";
import { getTopRepos } from "../controllers/user/commit/getTopRepos";
import { getUserRepos } from "../controllers/user/commit/getUserRepos";
import { deleteRepo } from "../controllers/user/commit/deleteRepo";
import { getSingleRepo } from "../controllers/user/commit/getSingleRepo";
import { writeMDfiles } from "../controllers/user/commit/writeMDFile";
import { readMDfiles } from "../controllers/user/commit/readMDFile";
import { updateMDFile } from "../controllers/user/commit/updateMDFile";
import { deleteMDFile } from "../controllers/user/commit/deleteMDFile";
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
router.get("/get-top-repos", authentication, getTopRepos);
router.get("/get-user-repos", authentication, getUserRepos);
router.delete("/delete-repo/:repoid", authentication, deleteRepo);
router.get("/get-single-repo/:repoid", authentication, getSingleRepo);
router.post("/:repoid/write-md-files", authentication, writeMDfiles);
router.get("/:repoid/md-files/:fileid", authentication, readMDfiles);
router.put("/:repoid/md-files/:fileid", authentication, updateMDFile);
router.delete("/:repoid/md-files/:fileid", authentication, deleteMDFile);

export default router;
