import express from 'express';
import { getHomePage } from '../controllers/homeController.js';
import { getAboutPage } from '../controllers/aboutController.js';
import { getContactPage } from '../controllers/contactController.js';

const router = express.Router();

router.get('/', getHomePage);
router.get('/about', getAboutPage);
router.get('/contact', getContactPage);

export default router;
