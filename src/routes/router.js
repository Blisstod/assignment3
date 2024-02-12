const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const userController = require('../controllers/userController');
const currencyController = require('../controllers/currencyController')
const nutritionController = require('../controllers/nutritionController')
const { isAuthenticated, isAdmin } = require('../helpers/helper');

router.get('/login', pageController.loginPage);
router.get('/register', pageController.registerPage);
router.get('/', isAuthenticated, pageController.homePage);
router.get('/admin', isAdmin, pageController.adminPanelPage);
router.get('/logout', userController.logout);

router.get('/nutrition-analysis', isAuthenticated, pageController.nutritionAnalysisPage);
router.get('/convert-currency', isAuthenticated, pageController.currencyConverterPage);
router.get('/history/nutrition', isAuthenticated, pageController.nutritionHistoryPage);
router.get('/history/currency', isAuthenticated, pageController.currencyHistoryPage);
router.get('/admin/users/add', isAdmin, pageController.addUserPage);
router.get('/admin/users/:id', isAdmin, pageController.userDetailsPage);
router.get('/admin/users/edit/:id', isAdmin, pageController.editUserPage);
router.get('/admin/users/delete/:id', isAdmin, userController.deleteUser);

router.post('/nutrition-analysis', nutritionController.analyzeNutrition);
router.post('/convert-currency', currencyController.convertCurrency);
router.post('/admin/users/add', isAdmin, userController.addUser)
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/admin/users/edit/:id', isAdmin, userController.editUser);

module.exports = router;
