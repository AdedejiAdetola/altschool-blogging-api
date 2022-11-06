const userRouter = require('express').Router();
const User = require('../models/user');
const Blog =  require("../models/blog");
const verify = require('../authentication/verify')

// UPDATE USER
userRouter.put('/:userId', verify, async (req, res)=>{
    //do something
    const userrrr = req.user.user._id;
    if(userrrr === req.params.userId){
        try{
            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                {
                    $set: req.body
                },
                { new: true}
            )
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }

})

//DELETE USER
userRouter.delete('/:userId', verify, async (req, res) => {
    const userrrr = req.user.user._id;
    // console.log("Params UserId", req.params.userId);
    // console.log("Just UserId", userrrr);
    if(userrrr === req.params.userId) {
        try{
            const user = await User.findById(req.params.userId);
            try{
                await User.findByIdAndDelete(req.params.userId);
                await Blog.deleteMany({ user: user.email });
                res.status(200).json("User deleted!");
             } catch (err) {
                res.status(500).json(err);            
            } 
        } catch (err) {
            res.status(404).json('User not found!');
        }
    } else {
        res.status(403).json("You are not permitted to delete this account")
    }
})


// GET USER
userRouter.get('/:userId', verify, async(req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        const {password, ...others} = user._doc;
        res.status(200).json(others);

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = userRouter;