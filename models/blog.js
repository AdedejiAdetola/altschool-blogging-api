const moogoose = require('mongoose');

//Define a schema
const Schema = moogoose.Schema;

//Define book schema
const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedState: {
        type: Boolean,
        default: false,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    read_count: {
        type: Number,
        required: false
    },
    reading_time: {
        type: Number,
        required: false
        //required: true
        //default: write code here??
    },
    tags: {
        type: Array,
        required: false
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    lastUpdateAt : {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

// Export the model
module.exports = moogoose.model('Blogs', BlogSchema); //collection name is Books. This is the name of the collection in the database