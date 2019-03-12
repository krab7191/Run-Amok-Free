const db = require("../models");


// Functions for getting public data
module.exports = {
    getAllUsers: function(req,res) {
        db.Users.find({})
            .select(["firstName","lastName","isAdmin"])
            .populate('notes')
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    getAllNotes: function(req,res) {
        db.Notes.find({})
            .select(["body","beverages"])
            .populate("beverages")
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