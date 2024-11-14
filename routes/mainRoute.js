import express from 'express';
import { getHomePage } from '../controllers/homeController.js';
import { getAboutPage } from '../controllers/aboutController.js';
import { getContactPage } from '../controllers/contactController.js';

import { getUserListPage } from '../controllers/UserController.js';
import { getDetailUserPage } from '../controllers/UserController.js';
import { getEditUserPage } from '../controllers/UserController.js';
import { get404Page } from '../controllers/404Controller.js';
import { getNewUserPage } from '../controllers/UserController.js';
import { getLoginPage } from '../controllers/UserController.js';
import { authAccount } from '../controllers/UserController.js';
import { createUser } from '../controllers/UserController.js';
import { updateUser } from '../controllers/UserController.js';
import { deleteUser } from '../controllers/UserController.js';

import { getProductListPage } from '../controllers/productController.js';
import { getAddProductPage } from '../controllers/productController.js';
import { createProduct } from '../controllers/productController.js';
import { getDetailProductPage } from '../controllers/productController.js';
import { getEditProductPage } from '../controllers/productController.js';
import { updateProduct } from '../controllers/productController.js';

import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getHomePage);
router.get('/about', getAboutPage);
router.get('/contact', getContactPage);
router.get('/create-new-user', getNewUserPage);
router.get('/login', getLoginPage);
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/')
        }
        res.redirect('/')
    })
})

router.get('/list-product', isAdmin, getProductListPage);
router.get('/add-product', isAdmin, getAddProductPage);
router.get('/detail-product/:productname', isAdmin, getDetailProductPage);
router.get('/edit-product/:productname', isAdmin, getEditProductPage);

router.post('/add-product', isAdmin, createProduct);
router.post('/update-product', isAdmin, updateProduct);

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
