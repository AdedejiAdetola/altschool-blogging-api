require('./db').connectToMongoDB() // Connect to MongoDB
require('dotenv').config()

require("./authentication/authenticate") // Signup and login authentication middleware

const bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const blogRouter = require('./routes/blogs')

app.use('/blog_api/auth', authRouter);

app.use('/blog_api/user', userRouter);

app.use('/blog_api', blogRouter)

app.get('/home', (req, res) => {
    res.send('Welcome to the Blogging API');
});



app.listen('5000', () => {
    console.log('Backend is running')
})