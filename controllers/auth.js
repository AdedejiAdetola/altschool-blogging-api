const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST SIGNUP
exports.postSignup = async (req, res, next) => {
    //console.log(req.user);
    // await res.status(200).json({
    //     message: 'Signup successful',
    //     user: req.user,
    // });
    await res.redirect('/home');
}

// POST LOGIN
exports.postLogin = async (err, user, info) => {
    try {
        if (err) {
            return next(err);
        }
        if (!user) {
            const error = new Error('Username or password is incorrect');
            return next(error);
        }

        req.login(user, { session: false },
            async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, email: user.email };
                //You store the id and email in the payload of the JWT. 
                // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
                // DO NOT STORE PASSWORDS IN THE JWT!
                const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {expiresIn: "1h"});

                res.redirect('/home');
                return res.json({ 
                    user,
                    token: token
                 });
                 
            }
        );
    } catch (error) {
        return next(error);
    }
}

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


exports.getHomePage = async (req, res, next) => {
    await res.status(200).render('home',{
        pageTitle: 'Home Page',
        path: '/home'
    });
}