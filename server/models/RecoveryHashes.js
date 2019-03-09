// @author: Karsten Rabe

// This model defines temporary, one-time redeemable recovery hashes

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helpers = require('./mongooseHelperFunctions');


// Add 5 days to the creation date
function calcExpiryDate() {
    let d = new Date();
    d = d.setDate(d.getDate() + 5);
    return new Date(d);
}

const Recovery = new Schema({
    hash: {
        type: String,
        unique: true,
        required: "A hash value is required!"
    },
    associatedUserEmail: {
        type: String,
        unique: true,
        required: "An associated email is required",
        validate: [helpers.email, "Please enter a valid email address"]
    },
    createdOn: {
        type: Date,
        required: "Must include the date created"
    },
    expiresOn: {
        type: Date,
        required: calcExpiryDate()
    }
});

module.exports = mongoose.model('Recovery', Recovery);


