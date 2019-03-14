const db = require("../models");
const path = require("path");

// Defining methods for the userController
module.exports = {
  getUserById: (req, res) => {

  },
  getAllUsers: (req, res) => {

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

  },
  authenticate: (req, res) => {

  },
  signin: (req, res) => {
    db.Users.find({
      email: req.params.email,
    })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  }
  
};