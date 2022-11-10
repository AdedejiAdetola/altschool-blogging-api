const Blog = require('../models/blog');
const User = require('../models/user');

//CREATE DRAFTED BLOGS (published state = false) 
exports.createBlog = async (req, res)=>{
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
}

//CREATE PUBLISHED BLOGS (to published state = true)
exports.createPublishedBlog = async (req, res) => {
    try{
        
        const blog = await Blog.findById(req.params.id)
        const user = await User.findById(req.params.userId);
        const {password, email, ...others} = user._doc;
        console.log(email)
        console.log(blog.email)
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
        console.log(err)
        res.status(500).json(err)
    }
}

//GET ALL BLOGS
exports.getAllBlogs = async (req, res) => {
    try {
        blogs = await Blog.find({ "publishedState": true});
        res.status(200).json(blogs)
    } catch (err) {
        res.status(400).json(err)
    }
}


//UPDATE BLOGS
exports.updateBlog = async (req, res) => {
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
}


//DELETE BLOG
exports.deleteBlog = async (req, res) => {
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
}


//BLOG OWNERS GET PUBLISHED AND DRAFTED BLOG
exports.ownerGetBlogs = async (req, res) => {

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
}