const db = require("../models");


// Functions for getting public data
module.exports = {
    getAllNotes: function(req,res) {
        db.Notes.find({})
            .select(["body","beverages","user"])
            .populate("beverages",["name","description"])
            .populate("user","firstName")
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    getAllBevs: function(req,res) {
        db.Beverages.find({})
            .select(["name","description","notes","isAvailable","dateUpdated"])
            .populate('notes')
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    getAvailBevs: function(req,res) {
        db.Beverages.find({
            isAvailable: true
        })
            .select(["name","description","notes","isAvailable","dateUpdated"])
            .populate('notes')
            .then(data => res.json(data))
            .catch(err=> res.status(422).json(err))
    }
};  