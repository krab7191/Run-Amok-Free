const db = require("../models");


// Functions for getting public data
module.exports = {
    getAllUsers: function(req,res) {
        db.Users.find({})
            .populate('notes')
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    getAllNotes: function(req,res) {
        db.Notes.find({})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    getAllBevs: function(req,res) {
        db.Beverages.find({})
            .populate('notes')
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    getAvailBevs: function(req,res) {
        db.Beverages.find({
            isAvailable: true
        })
            .populate('notes')
            .then(data => res.json(data))
            .catch(err=> res.status(422).json(err))
    }
};  