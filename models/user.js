const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


// The code in the UserScheme.pre() fun65ction is called a pre-hook.
// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it.
UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
);

// You will also need to make sure that the user trying to log in has the correct credentials. Add the following new method:
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }


const UserModel = mongoose.model('users', UserSchema); //users is the name of the collection in the database

module.exports = UserModel;