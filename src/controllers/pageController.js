const UserModel = require("../models/user");
const DeletedUserModel = require('../models/deletedUser')
const NutritionRequestModel = require('../models/nutritionRequest')
const ConversionRequestModel = require('../models/conversionRequest')
const e = require('express')
class pageController {
    async loginPage(req, res, next){
        try{
            res.render('login', { req: req });
        } catch (error){
            next(error);
        }
    }

    async registerPage(req,res,next){
        try {
            res.render('register', { req: req })
        } catch (error){
            next(error);
        }
    }

    async userDetailsPage(req, res) {
        try {
            const user = await UserModel.findById(req.params.id);
            res.render('user-details', { req: req ,user: user });
        } catch (error) {
            res.status(500).send('Error fetching user details');
        }
    }

    async editUserPage(req, res) {
        try {
            const user = await UserModel.findById(req.params.id);
            res.render('edit-user', { req: req, user: user });
        } catch (error) {
            res.status(500).send('Error fetching user details for edit');
        }
    }

    async addUserPage(req, res, next) {
        try {
            res.render('add-user', { req: req });
        } catch (error) {
            next(error);
        }
    }

    async adminPanelPage(req, res){
        try {
            const users = await UserModel.find();
            const deletedUsers = await DeletedUserModel.find();
            res.render('admin', {req: req, users, deletedUsers });
        } catch (error){
            res.status(500).send('Error accessing the admin page');
        }
    }

    async currencyConverterPage(req, res){
        res.render('currency-converter', { req: req })
    }

    async homePage(req, res){
        res.render('index', { req: req })
    }

    async nutritionAnalysisPage(req, res) {
        res.render('nutrition-analysis', {req: req , nutritionData: null });
    }

    async nutritionHistoryPage(req, res) {
        try {
            const nutritionHistory = await NutritionRequestModel.find({}).sort({ requestDate: -1 }); // Get the history sorted by date
            res.render('nutrition-history', { req: req, nutritionHistory });
        } catch (error) {
            res.status(500).send('Error accessing nutrition history');
        }
    }


    async currencyHistoryPage(req, res) {
        try {
            const currencyHistory = await ConversionRequestModel.find({}).sort({ requestDate: -1 });
            res.render('currency-history', { req: req, currencyHistory });
        } catch (error) {
            res.status(500).send('Error accessing currency history');
        }
    }


}

module.exports = new pageController();