const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');

require('./models/User.js');
// require('../models/Trucker');
require('./services/passport');

const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://' + keys.mongoURI);
// mongoose.connect('mongodb://alan:123@ds123929.mlab.com:23929/passport-alan');
const db = mongoose.connection;

const app = express();

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// when we are making use of this library, the cookie is the session,
// it contains the actual id of the user
// ** cookie session store all the data in the cookie **
// ** limited to about 14kb, so better for storing smaller amounts of data **
// this is automatically encrypted
// Cookie Session
// app.use(
// 	cookieSession({
// 		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
// 		// allow you to put in multiple keys in for added security
// 		keys: [keys.cookieKey]
// 	})
// );

// stores a reference to the session inside of the cookie, it stores
// an id to a session, express session takes the id and looks up all
// the relevant data referred to as a session store, used to access 
// the users data, stored in some remote data store
// ** express session stores all the data in a data store, and later
// pulls data out of the data store **
// ** can store as much data as we want to ** 
// Express Session
app.use(session({
	secret: [keys.secret],
	saveUninitialized: true,
	resave: true
}));

// express session 
// tell passport to make use of cookies/session
app.use(passport.initialize());
app.use(passport.session());

// Express Validator Middleware
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split(','), 
		root = namespace.shift(), 
		formParam = root;

		while(namespace.length) {
			formParam += '{' + namespace.shift() + '}';
		}

		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

require('./routes/users')(app);


// connect to routes above
// app.use('/', routes);
// app.use('/', users);


const PORT = process.env.PORT || 5000;
console.log("Server is listening on port: " + PORT);
app.listen(PORT);

