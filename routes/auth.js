const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { postSignup, postLogin, getSignup } = require('../controllers/auth');
require('dotenv').config();

const authRouter = express.Router();

authRouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }), postSignup
);

authRouter.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate('login', postLogin
        )(req, res, next);
    }
);

authRouter.get(
    '/signup', getSignup
)




module.exports = authRouter;
