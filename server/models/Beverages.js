// @author Karsten Rabe

// This model describes the way each mead batch is defined, its description, name, notes etc.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Beverages = new Schema({
  name: String,
  description: String,
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Notes"
    }
  ],
  isAvailable: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    required: "Date required when creating a beverage entry"
  },
  dateUpdated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Beverages", Beverages);
