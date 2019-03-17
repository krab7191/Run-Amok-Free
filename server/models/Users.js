// @author: Karsten Rabe

// Our boilerplate user model with a pre-save password hashing function

const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    // Password hashing: 1 increase in salt factor approximately doubles hashing time
    SALT_WORK_FACTOR = 10;

const helpers = require('./mongooseHelperFunctions');

const allLetters = str => {
    // Regex to match all human language characters . . . (No numbers or special characters, even though you can legally change your name to an emoji???)
    const allLetterRegex = new RegExp(/^[a-zA-Z]+$/);
    return allLetterRegex.test(str);
}

const lastNames = str => {
    // Regex for human language characters plus hyphen and apostrophe
    const lnRegex = new RegExp(/^[a-zA-Z '-]+$/);
    return lnRegex.test(str);
}

const password = str => {
    const passRegex = new RegExp('\^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    // const passRegex = new RegExp('\^(?=.*?[A-Z])(?=.*?[a-z])(?=.{4,}$');
    return passRegex.test(str);
}

const User = new Schema({
    firstName: {
        type: String,
        required: "A first name is required!",
        trim: true,
        validate: [allLetters, "Please enter a valid name!"]
    },
    lastName: {
        type: String,
        required: "A last name is required!",
        trim: true,
        validate: [lastNames, "Last names must contain only letters, hyphens and/or apostrophes!"]
    },
    email: {
        type: String,
        required: "Email address is required",
        trim: true,
        unique: true,
        validate: [helpers.email, "Please enter a valid email address."]
    },
    username: {
        type: String,
        trim: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: "Password is required."
        // !! Commented for development !!
        // validate: [password, "Password must contain one upper and one lower case letter, one special character, one number, and be at least 8 long"]
    },
    // Specific to Starrlight: mead members have discounts etc
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Notes'
    }],

    createdOn: {
        type: Date,
        required: "When creating a User entry, the date is required!!"
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
});

User.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

});

module.exports = mongoose.model('Users', User);