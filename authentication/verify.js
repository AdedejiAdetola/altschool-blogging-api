const jwt = require('jsonwebtoken');
require('dotenv').config();

const verify = async (req, res, next) => {
    const authHeader = await req.headers.authorization;
    //console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json('Invalid token');
                
                // return to login
            } 
            req.user = user;
            if (req.user.user._id !== req.params.userId) {
                return res.status(403).json('You are using a wrong token');
            }
            // console.log(req.user);
            // console.log(req.params)
            next();
        })
    } else {
        res.status(401).json('You are not authenticated!')
    }
}

module.exports = verify;