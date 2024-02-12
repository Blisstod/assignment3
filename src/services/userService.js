// userService.js

const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

class userService {
    async register(userData) {
        const { email, username, password } = userData;

        // Check if user already exists
        if (await UserModel.findOne({ username }) || await UserModel.findOne({ email })) {
            throw new Error('User already exists');
        }

        // Create a new user instance
        const newUser = new UserModel({
            username,
            email,
            password
        });

        // Save the new user to the database
        await newUser.save();

        return newUser;
    }

    async login(username, password) {
        const user = await UserModel.findOne({ username });
        if (!user) {
            throw new Error('There is no user with that username');
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid Password');
        }

        return user;
    }
}

module.exports = new userService();
