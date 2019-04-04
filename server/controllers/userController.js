const db = require("../models");

// Defining methods for the userController
module.exports = {
  getUserById: (req, res) => {},
  getUser: (req, res) => {
    console.log("===== user!!======");
    console.log(req.user);
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  },
  getAllUsers: (req, res) => {
    db.Users.find({})
      .select(["-password", "-notes", "-updatedOn"])
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  createToken: (req, res, next) => {
    db.Tokens.create(req.body)
      .then(data => {
        res.json(data);
        next();
      })
      .catch(err =>
        res.status(422).json({ Error: "Couldnt create a secure token!" })
      );
  },
  registerUser: (req, res) => {
    db.Tokens.findOne({
      token: req.body.token
    })
      .then(data => {
        if (data) {
          const token = req.body.token;
          delete req.body.token;
          const del = data.deleteOnRead;
          db.Users.create(req.body)
            .then(data => {
              if (del) {
                deleteToken(token);
              }
              res.json(data);
            })
            .catch(err => {
              f;
              if (err.name === "MongoError" && err.code === 11000) {
                sendErrMsg(res, "A user with that email already exists.");
              } else {
                sendErrMsg(res, "A problem occurred ask for a new token!");
              }
            });
        } else {
          sendErrMsg(res, "Token not valid!");
        }
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        res.status(422).json(err);
      });
  },
  logout: (req, res) => {
    if (req.user) {
      req.session.destroy();
      res.clearCookie("connect.sid"); // clean up!
      return res.json({ msg: "logging you out" });
    } else {
      return res.json({ msg: "no user to log out!" });
    }
  },
  auth: function(req, res, next) {
    console.log(req.body);
    console.log("================");
    next();
  },
  authenticate: (req, res) => {
    console.log(`Login: ${req.user}`);
    const user = JSON.parse(JSON.stringify(req.user)); // hack
    const cleanUser = Object.assign({}, user);
    if (cleanUser) {
      console.log(`Deleting password`);
      delete cleanUser.password;
    }
    res.json({ user: cleanUser });
  }
};

function deleteToken(t) {
  db.Tokens.deleteOne({
    token: t
  })
    .then(response => {
      console.log(`Deleted ${response._id}`);
    })
    .catch(err => console.log(err));
}

function sendErrMsg(res, msg) {
  res.status(422).json({ Error: msg });
}
