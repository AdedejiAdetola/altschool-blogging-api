const jwt = require('jsonwebtoken');
require('dotenv').config();

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    //console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json("Invalid Token")
            }
            req.user = user;
            next();
        })
    } else {
        res.status(401).json('You are not authenticated!')
    }
}

module.exports = verify;