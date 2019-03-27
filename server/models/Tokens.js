const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const helpers = require("./mongooseHelperFunctions");

const Token = new Schema({
    token: {
        type: String,
        required: "A token is required for registration!"
    },
    email: {
        type: String,
        trim: true,
        validate: [helpers.email, "Please enter a valid email address."]
    },
    deleteOnRead: {
        type: Boolean,
        default: false
    },
    validUntil: {
        type: Date,
        default: +new Date() + 30*60*1000
    }

});

module.exports = mongoose.model('Tokens',Token);