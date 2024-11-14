import express from 'express';
import { getHomePage } from '../controllers/homeController.js';
import { getUserListPage } from '../controllers/UserController.js';
import { getDetailUserPage } from '../controllers/UserController.js';
import { getEditUserPage } from '../controllers/UserController.js';
import { getAboutPage } from '../controllers/aboutController.js';
import { getContactPage } from '../controllers/contactController.js';
import { get404Page } from '../controllers/404Controller.js';
import { getNewUserPage } from '../controllers/UserController.js';
import { getLoginPage } from '../controllers/UserController.js';
import { authAccount } from '../controllers/UserController.js';
import { createUser } from '../controllers/UserController.js';
import { updateUser } from '../controllers/UserController.js';
import { deleteUser } from '../controllers/UserController.js';

import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getHomePage);
router.get('/about', getAboutPage);
router.get('/contact', getContactPage);
router.get('/create-new-user', getNewUserPage);
router.get('/login', getLoginPage);

router.get('/list-user', isAdmin, getUserListPage);
router.get('/detail-user/:username', isAdmin, getDetailUserPage);
router.get('/edit-user/:username', isAdmin, getEditUserPage);
router.get('/delete-user/:username', isAdmin, deleteUser);

router.post('/create-new-user', createUser);
router.post('/login', authAccount);
router.post('/update-user', isAdmin, updateUser);

// Route 404 nên được đặt ở cuối
router.get('/*', get404Page);

export default router;
