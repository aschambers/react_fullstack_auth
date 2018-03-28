const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	username: {
		type: String
	},
	password: {
		type: String
	}
});

const User = module.exports = mongoose.model('users', UserSchema);

module.exports.createUser = function(newUser, callback) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			User.findOne({username:newUser.username}, function(e, o) {
                if (o){
                    callback('username-taken');
                } else {
                	User.findOne({email:newUser.email}, function(e, o) {
                		if (o){
                    		callback('email-taken');
                		} else {
							// store hash in database
							newUser.password = hash;
							newUser.save(callback);
						}
					});
				}
			});
		});
	});
}

module.exports.getUserByUsername = function(username, callback) {
	let query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

module.exports.comparePassword = function(password, hash, callback) {
	bcrypt.compare(password, hash, function(err, res) {
		if(err) {
			callback('invalid-password');
		} 
		callback('invalid-password', res);
	})
}