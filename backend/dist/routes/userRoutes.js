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
const repository_1 = require("../controller/User/commit/repository");
const repository_2 = require("../controller/User/commit/repository");
const repository_3 = require("../controller/User/commit/repository");
const repository_4 = require("../controller/User/commit/repository");
const repository_5 = require("../controller/User/commit/repository");
const repository_6 = require("../controller/User/commit/repository");
const repository_7 = require("../controller/User/commit/repository");
const repository_8 = require("../controller/User/commit/repository");
const repository_9 = require("../controller/User/commit/repository");
const userAuth_1 = require("../middleware/userAuth");
//Authentication
router.post("/auth/register", register_1.register);
router.post("/auth/login", login_1.login);
router.post("/auth/verify-registration", verify_1.verifyRegistration);
router.post("/auth/forgot-password", forgotPassword_1.forgotPassword);
router.post("/auth/verify-updation", update_1.verifyUpdation);
router.post("/auth/reset-password", resetPassword_1.resetPassword);
//Repository
router.post("/create-repo", userAuth_1.authentication, repository_1.createRepo);
router.get("/get-top-4-repos", userAuth_1.authentication, repository_2.getTop4Repos);
router.get("/my-repos", userAuth_1.authentication, repository_3.myRepos);
router.delete("/:repoid/delete-repo", userAuth_1.authentication, repository_4.deleteRepo);
router.get("/:repoid", userAuth_1.authentication, repository_5.getRepo);
router.post("/:repoid/write-md-files", userAuth_1.authentication, repository_6.writeMDfiles);
router.get("/:repoid/md-files/:fileid", userAuth_1.authentication, repository_7.readMDfiles);
router.put("/:repoid/md-files/:fileid", userAuth_1.authentication, repository_8.updateMDFile);
router.delete("/:repoid/md-files/:fileid", userAuth_1.authentication, repository_9.deleteMDFile);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map