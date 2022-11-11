const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { postSignup, postLogin, getSignup, getLogin } = require('../controllers/auth');
require('dotenv').config();

const authRouter = express.Router();

authRouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }), postSignup
);

authRouter.post(
    '/login',postLogin
    
);

authRouter.get(
    '/signup', getSignup
)

authRouter.get(
    '/login', getLogin
)




module.exports = authRouter;
