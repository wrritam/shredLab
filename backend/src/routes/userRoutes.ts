import { Router } from 'express';
import { register } from '../controllers/user/auth/register';
import { login } from '../controllers/user/auth/login';
import { verifyRegistration } from '../controllers/user/auth/verify';
import { forgotPassword } from '../controllers/user/auth/forgotPassword';
import { verifyUpdation } from '../controllers/user/auth/update';
import { resetPassword } from '../controllers/user/auth/resetPassword';
import { createRepo } from '../controllers/user/commit/createRepo';
import { getTopRepos } from '../controllers/user/commit/getTopRepos';
import { getUserRepos } from '../controllers/user/commit/getUserRepos';
import { deleteRepo } from '../controllers/user/commit/deleteRepo';
import { getSingleRepo } from '../controllers/user/commit/getSingleRepo';
import { writeMDfiles } from '../controllers/user/commit/writeMDFile';
import { readMDfiles } from '../controllers/user/commit/readMDFile';
import { updateMDFile } from '../controllers/user/commit/updateMDFile';
import { deleteMDFile } from '../controllers/user/commit/deleteMDFile';
import { raiseNewIssue } from '../controllers/user/commit/raisingIssuesOnRepo';
import { authentication } from '../middleware/userAuth';
import { commentUnderRepoFile } from '../controllers/user/others/commentUnderRepoFile';
import { deleteCommentUnderRepoFile } from '../controllers/user/others/deleteCommentUnderRepoFiles';
import { allIssueOnRepo } from '../controllers/user/others/allIssuesOnRepo';
import { getSingleIsuueOnRepo } from '../controllers/user/others/getSingleIsuueOnRepo';
import { getUserInfo } from '../controllers/user/credentials/getUserInfo';
import { getUserInfoByUsername } from '../controllers/user/others/getUserInfoByUsername';

const router = Router();

//Authentication
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/verify-registration', verifyRegistration);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/verify-updation', verifyUpdation);
router.post('/auth/reset-password', resetPassword);

//user
router.get('/get-user-private-info', authentication, getUserInfo)
router.get('/get-user-info/:username', getUserInfoByUsername)

// Commits and Repos Operation
router.post('/create-repo', authentication, createRepo);
router.get('/get-top-repos/:username', authentication, getTopRepos);
router.get('/get-user-repos', authentication, getUserRepos);
router.delete('/delete-repo/:repoid', authentication, deleteRepo);
router.get('/get-single-repo/:repoid', authentication, getSingleRepo);
router.post('/:repoid/write-md-files', authentication, writeMDfiles);
router.get('/:repoid/md-files/:fileid', authentication, readMDfiles);
router.put('/:repoid/md-files/:fileid', authentication, updateMDFile);
router.delete('/:repoid/md-files/:fileid', authentication, deleteMDFile);
router.post('/:repoid/create-issue', authentication, raiseNewIssue);

// Other Operations

router.post('/comment-under-repo-file/:repoid/:fileid', authentication, commentUnderRepoFile);
router.delete('/delete-comment/:repoid/:fileid/:commentid', authentication, deleteCommentUnderRepoFile);
router.get('/issues/:repoid', authentication, allIssueOnRepo);
router.get('/issue/:repoid/:issueid', authentication, getSingleIsuueOnRepo);

export default router;
