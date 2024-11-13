import express from 'express';
import { getHomePage } from '../controllers/homeController.js';
import { getUserListPage } from '../controllers/UserController.js';
import { getDetailUserPage } from '../controllers/UserController.js';
import { getAboutPage } from '../controllers/aboutController.js';
import { getContactPage } from '../controllers/contactController.js';
import { get404Page } from '../controllers/404Controller.js';
import { getNewUserPage } from '../controllers/UserController.js';
import { getLoginPage } from '../controllers/UserController.js';
import { authAccount } from '../controllers/UserController.js';
import { createUser } from '../controllers/UserController.js';

const router = express.Router();

router.get('/', getHomePage);
router.get('/list-user', getUserListPage);
router.get('/detail-user/:username', getDetailUserPage);
router.get('/about', getAboutPage);
router.get('/contact', getContactPage);
router.get('/create-new-user', getNewUserPage);
router.get('/login', getLoginPage);
router.get('/*', get404Page);

router.post('/create-new-user', createUser);
router.post('/login', authAccount);



export default router;
