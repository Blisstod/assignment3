const bcrypt = require("bcrypt");
const userService = require('../services/userService')
const UserModel = require('../models/user')
const DeletedUserModel = require('../models/deletedUser')

class userController{
    async register(req, res, next) {
        try {
            const { username, email, password, rePassword } = req.body;

            if (password !== rePassword) {
                return res.status(400).render('register', { req: req, message: 'Passwords do not match!' });
            }

            const user = await userService.register({ email, username, password });

            req.session.user = { id: user._id, username: user.username, isAdmin: user.isAdmin };
            return res.redirect('/login');
        } catch (error) {
            console.error(error);
            res.status(400).render('register', { req: req, message: error.message });
        }
    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await userService.login(username, password);

            req.session.user = { id: user._id, username: user.username, isAdmin: user.isAdmin };

            if (user.isAdmin) {
                return res.redirect('/admin');
            }

            return res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(400).render('login', { req: req, message: error.message });
        }
    }


    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error during logout');
            } else {
                res.redirect('/login');
            }
        });
    }

    async deleteUser(req, res) {
        try {
            const user = await UserModel.findById(req.params.id);

            if (!user)
                return res.status(404).send('User Not Found')

            const deletedUser = new DeletedUserModel({
                username: user.username,
                email: user.email,
                creationDate: user.creationDate,
                deletionDate: Date.now()
            })

            await deletedUser.save();

            await UserModel.findByIdAndDelete(req.params.id);
            res.redirect('/admin');
        } catch (error) {
            res.status(500).send('Error deleting user');
        }
    }

    async editUser(req, res) {
        try {
            const { username, email, password, isAdmin } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.findByIdAndUpdate(req.params.id, { username, email, password: hashedPassword, isAdmin, updateDate: Date.now()});
            res.redirect('/admin');
        } catch (error) {
            res.status(500).send('Error updating user details');
        }
    }

    async addUser(req, res) {
        try {
            const { username, email, password, isAdmin } = req.body;
            await userService.register({ username, email, password, isAdmin });
            res.redirect('/admin');
        } catch (error) {
            res.status(400).render('add-user', { req: req, message: error.message });
        }
    }


}

module.exports = new userController();