const jwt = require('jsonwebtoken');
require('dotenv').config();
const passport = require('passport');

// POST SIGNUP
exports.postSignup = async (req, res, next) => {
    //console.log(req.user);
    // await res.status(200).json({
    //     message: 'Signup successful',
    //     user: req.user,
    // });
    await res.redirect('/blog_api/auth/login');
}

const token = '';
// POST LOGIN
exports.postLogin = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                // const error = new Error('Username or password is incorrect');
                console.log(user);
                // return next(error);
                res.json(err)
                
            }
    
            req.login(user, { session: false },
                async (error) => {
                    if (error) return next(error);
    
                    const body = { _id: user._id, email: user.email };
                    
                    const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {expiresIn: "1h"});
    
                    //res.redirect('/blog_api/user/'+user._id)
                    return res.json({ 
                        user,
                        token: token
                     });
                    //render token to user controller
                    
                }
            );
        } catch (error) {
            return next(error);
        }
    }
    )(req, res, next);
}

console.log('token', token)

// GET SIGNUP
exports.getSignup = (req, res, next) => {
    //  console.log('In the middle of the back-end!');
     res.status(200).render('signup', { 
        pageTitle: 'Signup Page',
        path: '/blog_api/auth/signup',
        formCSS: true,
        productCSS: true
    });
};

//GET HOMEPAGE
exports.getHomePage = async (req, res, next) => {
    await res.status(200).render('home',{
        pageTitle: 'Home Page',
        path: '/home'
    });
}

//GET LOGIN
exports.getLogin = async (req, res, next) => {
    await res.status(200).render('login',{
        pageTitle: 'Login Page',
        path: '/blog_api/auth/login'
    })
}