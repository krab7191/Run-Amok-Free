const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const helpers = require("./mongooseHelperFunctions");
const uniqueValidator = require('mongoose-unique-validator');

const Token = new Schema({
  token: {
    type: String,
    required: "A token is required for registration!",
    unique: true
  },
  email: {
    type: String,
    trim: true,
    validate: [helpers.email, "Please enter a valid email address."]
  },
  deleteOnRead: {
    type: Boolean,
    default: true
  },
  validUntil: Date
});

Token.pre("save", function(next) {
  let token = this;
  const d = new Date();
  d.setDate(d.getDate() + 5);
  token.validUntil = d;
  next();
});

Token.plugin(uniqueValidator);

module.exports = mongoose.model("Tokens", Token);
