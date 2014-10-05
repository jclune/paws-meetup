/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt');

module.exports = {
	schema: true,

  attributes: {
  	email: {
  		// make it email later
  		type: 'string',
  		unique: true,
  		required: true
  	},
  	password: {
  		// make it password later
  		type: 'string',
  		required: true,
  	},
  	firstName: 'string',
  	lastName: 'string',
  	loggedIn: 'boolean',
  	isAdmin: 'boolean',

  	fullName: function() {
      return this.firstName + ' ' + this.lastName;
    }
  },

  toJSON: function(){
		var obj = this.toObject();
		delete obj.password;
		return obj;
	},

	beforeCreate: function (values, next) {
		if(!values.password) {
			return next();
		}
		var salt = bcrypt.genSaltSync(10);
		bcrypt.hash(values.password, salt, function (err, hash) {
			if (err) return next(err);
			values.password = hash;
			next();
		});
	}

};
