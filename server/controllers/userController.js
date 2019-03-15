const db = require("../models");
const path = require("path");

// Defining methods for the userController
module.exports = {
  getUserById: (req, res) => {

  },
  getUser: (req,res) => {
    console.log('===== user!!======');
    console.log(req.user);
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  },
  getAllUsers: (req, res) => {
    db.Users.find({})
        .select(["firstName","lastName","isAdmin","email","notes","createdOn"])
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err))
  },
  searchUserByEmail: (req, res) => {

  },
  searchUserByFirstName: (req, res) => {

  },
  searchUserByLastName: (req, res) => {

  },
  registerUser: (req, res) => {
    console.log(req.body);
    db.Users.create(req.body)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  logout: (req, res) => {
    if (req.user) {
      req.session.destroy();
      res.clearCookie('connect.sid'); // clean up!
      return res.json({ msg: 'logging you out' });
    } else {
      return res.json({ msg: 'no user to log out!' });
    }
  },
  auth: function(req, res, next) {
    console.log("Got here!");
		console.log(req.body);
		console.log('================');
		next();
  },
  authenticate: (req, res) => {
    console.log('POST to /login');
    console.log(req.user);
		const user = JSON.parse(JSON.stringify(req.user)); // hack
		const cleanUser = Object.assign({}, user);
		if (cleanUser) {
			console.log(`Deleting ${cleanUser.password}`);
			delete cleanUser.password;
		}
		res.json({ user: cleanUser });
	}
};