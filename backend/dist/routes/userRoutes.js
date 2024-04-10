"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_1 = require("../controllers/user/auth/register");
const login_1 = require("../controllers/user/auth/login");
const verify_1 = require("../controllers/user/auth/verify");
const forgotPassword_1 = require("../controllers/user/auth/forgotPassword");
const update_1 = require("../controllers/user/auth/update");
const resetPassword_1 = require("../controllers/user/auth/resetPassword");
const createRepo_1 = require("../controllers/user/commit/createRepo");
const getTopRepos_1 = require("../controllers/user/commit/getTopRepos");
const getUserRepos_1 = require("../controllers/user/commit/getUserRepos");
const deleteRepo_1 = require("../controllers/user/commit/deleteRepo");
const getSingleRepo_1 = require("../controllers/user/commit/getSingleRepo");
const writeMDFile_1 = require("../controllers/user/commit/writeMDFile");
const readMDFile_1 = require("../controllers/user/commit/readMDFile");
const updateMDFile_1 = require("../controllers/user/commit/updateMDFile");
const deleteMDFile_1 = require("../controllers/user/commit/deleteMDFile");
const userAuth_1 = require("../middleware/userAuth");
const commentUnderRepoFile_1 = require("../controllers/user/others/commentUnderRepoFile");
const router = (0, express_1.Router)();
//Authentication
router.post('/auth/register', register_1.register);
router.post('/auth/login', login_1.login);
router.post('/auth/verify-registration', verify_1.verifyRegistration);
router.post('/auth/forgot-password', forgotPassword_1.forgotPassword);
router.post('/auth/verify-updation', update_1.verifyUpdation);
router.post('/auth/reset-password', resetPassword_1.resetPassword);
// Commits and Repos Operation
router.post('/create-repo', userAuth_1.authentication, createRepo_1.createRepo);
router.get('/get-top-repos', userAuth_1.authentication, getTopRepos_1.getTopRepos);
router.get('/get-user-repos', userAuth_1.authentication, getUserRepos_1.getUserRepos);
router.delete('/delete-repo/:repoid', userAuth_1.authentication, deleteRepo_1.deleteRepo);
router.get('/get-single-repo/:repoid', userAuth_1.authentication, getSingleRepo_1.getSingleRepo);
router.post('/:repoid/write-md-files', userAuth_1.authentication, writeMDFile_1.writeMDfiles);
router.get('/:repoid/md-files/:fileid', userAuth_1.authentication, readMDFile_1.readMDfiles);
router.put('/:repoid/md-files/:fileid', userAuth_1.authentication, updateMDFile_1.updateMDFile);
router.delete('/:repoid/md-files/:fileid', userAuth_1.authentication, deleteMDFile_1.deleteMDFile);
// Other Operations
router.post('/comment-under-repo-file/:repoid/:fileid', userAuth_1.authentication, commentUnderRepoFile_1.commentUnderRepoFile);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map