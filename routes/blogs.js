const blogRouter = require('express').Router();
const verify = require('../authentication/verify');
const { createBlog, createPublishedBlog, getAllBlogs, updateBlog, deleteBlog, ownerGetBlogs } = require('../controllers/blogs');

//CREATE BLOGS (published state = false)
blogRouter.post('/:userId/blog', verify, createBlog)

//UPDATE BLOGS (to published state = true)
blogRouter.put('/:userId/blog/:id/pub', verify, createPublishedBlog)

//GET UPDATED BLOGS FOR ALL TO SEE #HOMEPAGE
blogRouter.get('/', getAllBlogs)

//GET UPDATED BLOGS WITH FULL DETAILS

//UPDATE BLOGS (publishedState = false or true)

blogRouter.put('/:userId/blog/:id', verify, updateBlog)

//DELETE BLOGS (publishedState = false or true)
blogRouter.delete('/:userId/blog/:id', verify, deleteBlog)

//BLOG OWNERS GET ALL BLOGS
blogRouter.get('/:userId/blog', verify, ownerGetBlogs)

module.exports = blogRouter;