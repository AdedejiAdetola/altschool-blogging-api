const userRouter = require('express').Router();
const verify = require('../authentication/verify');
const { updateUser, deleteUser, getUser } = require('../controllers/users');

// UPDATE USER
userRouter.put('/:userId', verify, updateUser)

//DELETE USER
userRouter.delete('/:userId', verify, deleteUser)


// GET USER
userRouter.get('/:userId', verify, getUser)

module.exports = userRouter;