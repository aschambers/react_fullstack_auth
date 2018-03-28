// required to use login with passport
const passport = require('passport');
// uses regular custom built login to sign-in
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
// required to execute some passport functionality
const User = require('../models/User');

passport.use(new LocalStrategy(
	(username, password, callback) => {
		User.getUserByUsername(username, (err, user) => {
			if(err) {
				return callback(err);
			};
			if(!user) {
				return callback(null, false);
			}
			User.comparePassword(password, user.password, (err, success) => {
				if(success) {
					return callback(null, user);
				} else {
					console.log(err);
					return callback(null, false);
				}
			});
		});
	}
));
// called before creating a session using a cookie on the user's browser
passport.serializeUser((user, done) => {
	done(null, user.id);
});
// token gets passed into deserialize user, pass it back to passport,
// and authenticate them to allow them to perform some function
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});