const db = require("../models");

// Define methods for SETTING various data from the Users, Wines, etc collections
module.exports = {
    createNote: function(req,res) {
        console.log(req.body);
        db.Notes.create(req.body)
        .then(data => res.json(data))
        .catch((err) => res.status(422).json(err))
    }

}