const db = require("../models");

// Define methods for SETTING various data from the Users, Wines, etc collections
module.exports = {
  createNote: function(req, res) {
    const { permissions } = res.locals;
    console.log(`Permissions level: ${permissions}`);
    if (permissions > 0) {
      db.Notes.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err));
    }
  },
  checkUname: function(req, res) {
    const { username } = req.body;

    db.Users.find({ username })
      .then(resp => {
        if (resp.length > 0) {
          res.json({ unique: false });
        } else {
          res.json({ unique: true });
        }
      })
      .catch(err => {
        console.log(err);
        res.json({ err });
      });
  },
  createBeverage: function(req, res) {
    const { body } = req;
    body.dateCreated = new Date();
    db.Beverages.create(body)
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(422).json(err));
  }
};
