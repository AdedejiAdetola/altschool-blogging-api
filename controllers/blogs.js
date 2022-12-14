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

//GET CREATE BLOGS PAGE

exports.getCreateBlogs = async (req, res) => {
    const user = await User.findById(req.params.userId);
    const {password, email, ...others} = user._doc;
    console.log('details.id', others)
    res.status(200).render('c-blog',{
        pageTitle: 'createBlog',
        details: others,
        path: '/blog_api/' + details._id + '/create'
    })
}

//CREATE PUBLISHED BLOGS (to published state = true)
exports.createPublishedBlog = async (req, res) => {
    try{
        
        const blog = await Blog.findById(req.params.id)
        const user = await User.findById(req.params.userId);
        const {password, email, ...others} = user._doc;
        //console.log(email)
        //console.log(blog.email)
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
        //res.status(200).json(blogs);
        res.status(200).render('blogs', {
            pageTitle:'Blog Page',
            blogs: blogs
        })
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
    console.log(published)
    try {
        let blogs;
        const user = await User.findById(req.params.userId);
        const {password, email, ...others} = user._doc;
        if (published || !published) {
            console.log(published)
            // /:userId/blog?pub=true #published post
            // /:userId/blog?pub=false #drafted post
            blogs = await Blog.find({ email, "publishedState":published  });

            // res.status(200).json(blogs)
            console.log('published state',blogs)
            res.status(200).render('published-state', {
                pageTitle: 'publishedState',
                blogs
            })
        } else {
            blogs = await Blog.find({ email });
            // res.status(200).json(blogs)
            //console.log('all-blogs',blogs)
            console.log('blogs', blogs)
            res.status(200).render('all-blogs', {
                pageTitle: 'AllBlogs',
                blogs
            })
        }
    } catch (err) {
        res.status(400).json(err)
    }
}