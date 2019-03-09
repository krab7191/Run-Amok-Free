// @author Karsten Rabe

// This model describes the way tasting notes are stored and associated with Users and Beverages

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Note = new Schema({
  // `body` is of type String
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }

});

module.exports = mongoose.model("Notes", Note);
