const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// WHEN DEALING WITH INITIAL AND SUBSEQUENT 'save' and 'update' operations
// var update = {
//     updatedAt: new Date(),
//     $setOnInsert: {
//       createdAt: new Date()
//     }
//   };

const Team = new Schema({
    teamName: {
        type: String,
        required: "A team name is required!",
        trim: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Teams', Team);