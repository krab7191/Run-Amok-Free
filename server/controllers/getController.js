const db = require("../models");

// Functions for getting public data
module.exports = {
  getAllNotes: function(req, res) {
    const { _id } = req.params;
    db.Users.findOne({ _id })
      .then(resp => {
        db.Notes.find({})
          .select(["body", "beverages", "user", "dateCreated"])
          .populate("user", "notes")
          .then(data => {
            if (resp.isAdmin) {
              res.json(data);
            } else {
              const usersNotes = data.filter(note => {
                return _id == note.user._id;
              });
              res.json(usersNotes);
            }
          })
          .catch(err => res.status(422).json(err));
      })
      .catch(err => {
        console.log(err);
        res.json({ err });
      });
  },
  // Beverage management page
  getAllBeverages: function(req, res) {
    db.Beverages.find({})
      // The beverage mgmt page doesn't need the notes or mongoose __v
      .select(["-notes", "-__v"])
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(422).json(err));
  },
  getAvailBevs: function(req, res) {
    db.Beverages.find({
      isAvailable: true
    })
      .select(["-dateCreated", "-isAvail"])
      .populate("notes", ["body", "beverages"])
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  getValidTokens: function(req, res) {
    db.Tokens.find({
      deleteOnRead: false
    })
      .then(resp => {
        console.log(`valid tokens: ${resp}`);
        res.json(resp);
      })
      .catch(err => {
        console.log(`Error finding valid tokens`);
        res.status(422).json(err);
      });
  }
};
