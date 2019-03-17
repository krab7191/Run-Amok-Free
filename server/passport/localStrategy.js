const db = require('../models');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
	{
		usernameField: 'email' // tell passport to look for email instead of username
	},
	function (username, password, done) {
		db.Users.findOne({ 'email': username }, (err, user) => {
			if (err) { return done(err); }
			if (!user) { return done(null, false); }
			return done(null, user);
		});
	}
);

module.exports = strategy;
