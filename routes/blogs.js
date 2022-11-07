const blogRouter = require('express').Router();
const User = require('../models/user');
const Blog =  require("../models/blog");
const verify = require('../authentication/verify')

//CREATE BLOGS (published state = false)
blogRouter.post('/:userId/blog', verify, async (req, res)=>{
    const newBlog = new Blog(req.body)
    try {
        const savedBlog = await newBlog.save()
        res.status(200).json(savedBlog)

        // const user = await User.findById(req.params.userId);
        // const {password, email, ...others} = user._doc;
        // console.log(email)
        // console.log(req.body.email)
    } catch (err) {
        res.status(500).json(err)
    }
})



//UPDATE BLOGS (to published state = true)
blogRouter.put('/:userId/blog/:id/pub', verify, async (req, res) => {
    try{
        
        const blog = await Blog.findById(req.params.id)
        const user = await User.findById(req.params.userId);
        const {password, email, ...others} = user._doc;
        // console.log(email)
        // console.log(blog.email)
        if (blog.email === email) {
            
            try {
                const updatedBlog = await Blog.findByIdAndUpdate(
                    req.params.id,
                    {
                        "publishedState": true
                    }, { new: true}
                )
                res.status(200).json(updatedBlog);
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json('You can only update  your blog post')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET UPDATED BLOGS FOR ALL TO SEE #HOMEPAGE
blogRouter.get('/', async (req, res) => {
    try {
        blogs = await Blog.find({ "publishedState": true});
        res.status(200).json(blogs)
    } catch (err) {
        res.status(400).json(err)
    }
})

//UPDATE BLOGS (publishedState = false or true)

blogRouter.put('/:userId/blog/:id', verify, async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id)
        const user = await User.findById(req.params.userId);
        const {password, email, ...others} = user._doc;
        // console.log(email)
        // console.log(blog.email)
        if (blog.email === email) {
            
            try {
                const updatedBlog = await Blog.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body
                    }, { new: true}
                )
                res.status(200).json(updatedBlog);
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json('You can only update  your blog post')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE BLOGS (publishedState = false or true)
blogRouter.delete('/:userId/blog/:id', verify, async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id)
        const user = await User.findById(req.params.userId);
        const {password, email, ...others} = user._doc;
        // console.log(email)
        // console.log(blog.email)
        if (blog.email === email) {
            
            try {
                await Blog.findByIdAndDelete(req.params.id)
                res.status(200).json("Blog deleted");
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json('You can only delete  your blog post')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//BLOG OWNERS GET ALL BLOGS
blogRouter.get('/:userId/blog', verify, async (req, res) => {

    const published = req.query.pub;
    try {
        let blogs;
        const user = await User.findById(req.params.userId);
        const {password, email, ...others} = user._doc;
        if (published) {
            // /:userId/blog?pub=true #published post
            // /:userId/blog?pub=false #drafted post
            blogs = await Blog.find({ email, "publishedState":published  });
            res.status(200).json(blogs)
        } else {
            blogs = await Blog.find({ email });
            res.status(200).json(blogs)
        }
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = blogRouter;