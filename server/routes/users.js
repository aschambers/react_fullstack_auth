const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const keys = require('../config/keys');
// required to register a new user
const User = require('../models/User');

module.exports = app => {
	// register user
	app.post('/api/register', function(req, res) {
		let name = req.body['name'];
		let email = req.body['email'];
		let username = req.body['username'];
		let password = req.body['password'];
		let passconfirm = req.body['passconfirm'];

		// validation checks
		req.checkBody('name', 'Name is required').notEmpty();
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email is not valid').isEmail();
		req.checkBody('username', 'Username is required').notEmpty();
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('passconfirm', 'Passwords do not match').equals(req.body.password);
		
		let errors = req.validationErrors();

		if(errors) {
			for(i = 0; i < errors.length; i++) {
				console.log(errors[i]);
			}
		} else {
			let newUser = new User({
				name: name,
				email: email,
				username: username,
				password: password
			});

			User.createUser(newUser, function(err, user) {
				if(err) {
					console.log('err: ' + err);
					res.send(err);
				} else {
					console.log('user: ' + user);
					res.send(user);
					// res.status(200).send(user);
					// req.login(user, function (err) {
		   //          	if (!err){
		   //              	console.log('success');
		   //              	res.status(200).send('signuplogin');
		   //          	} else {
		   //              	//handle error
		   //          	}
		   //      	})
		        }
			});
		}
	});

	// use passport local strategy
	app.post('/api/login', passport.authenticate('local'), function(req, res) {
		// res.redirect('/');
		req.login(req.user, function(err) {
  			if (err) { 
  				return next(err); 
  			}
  			console.log('req.login success');
		});
		console.log('outside req.login');
		console.log('req.user: ' + req.user);
		res.status(200).send(req.user);
	});

	// get current user who is logged in
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
	// passport attaches functions to request object after logging in
	// req.logout will logout the user, redirect on logout
	app.get('/api/logout', (req, res) => {
		req.session.destroy();
		res.redirect('/');
	});

	app.get('/dashboard', ensureAuthenticated, (req, res) => {
		
	})
	
	function ensureAuthenticated(req, res, next) {
		if(req.isAuthenticated()) {
			return next();
		} else {
			console.log('you are not logged in atm');
			res.redirect('/login');
		}
	}
}