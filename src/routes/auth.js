const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const session = require('express-session')

router.use(session({
    secret: 'asdf',
    saveUninitialized: true,
    resave: true
}))

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('registration')
})

router.get('/', isAuthenticated, (req, res, next) => {
    console.log("something")
    res.render('index', { pageTitle: 'City Name Input' });
});

router.post('/register', async(req, res) => {
    try {
        const { email, password, rePassword } = req.body;

        if (await User.findOne({ email: email })) {
            return res.status(400).render('registration', { message: 'User already exists' });
        }

        if (password !== rePassword){
            return res.status(400).render('registration', { message: 'Passwords do not match!' });
        }
        
        const newUser = new User({
            email: email,
            password: password
        });

        await newUser.save();

        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in Saving');
    }
})

router.post('/login', async(req, res) => {
    try{

        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        console.log(user)
        console.log(email, password)
        if (!user) return res.status(400).send('There is no user with that email')

        if (await bcrypt.compare(password, user.password)) {
            req.session.user = user;
            res.redirect('/')
        } else {
            return res.status(400).send('Invalid Email or Password.')
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error"})
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/login');
    });
});

function isAuthenticated(req, res, next){
    if (req.session && req.session.user){
        console.log("yes")
        return next();
    }
    console.log("not")
    return res.redirect('/login');
}

module.exports = router;