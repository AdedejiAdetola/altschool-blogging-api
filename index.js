require('./db').connectToMongoDB() // Connect to MongoDB
require('dotenv').config()

require("./authentication/authenticate") // Signup and login authentication middleware

const cookieParser = require('cookie-parser')
const path = require('path');

const bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const blogRouter = require('./routes/blogs');
const { getHomePage } = require('./controllers/auth');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/blog_api/auth', authRouter);

app.use('/blog_api/user', userRouter);

app.use('/blog_api', blogRouter)

app.get('/home', getHomePage);



app.listen('5000', () => {
    console.log('Backend is running')
})


