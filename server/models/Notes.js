// @author Karsten Rabe

// This model describes the way tasting notes are stored and associated with Users and Beverages

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Note = new Schema({

});

module.exports = mongoose.model("Notes", Note);