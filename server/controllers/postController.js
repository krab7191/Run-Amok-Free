const db = require("../models");

// Define methods for SETTING various data from the Users, Wines, etc collections
module.exports = {
  createNote: function(req, res) {
    console.log(req.body);
    db.Notes.create(req.body)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  // return axios.post('/api/post/unameCheck', uname);
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
  }
};
