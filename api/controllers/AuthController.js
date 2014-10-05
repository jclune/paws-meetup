/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var bcrypt = require('bcrypt');

module.exports = {
	login: function (req, res) {
		var u = req.param('email');
		var p = req.param('password');

		console.log("u", u);
		console.log("p", p);

		User.findOrCreate({ email: u}, { email: u, password: p}, function(err, user) {
			if(err) {
        console.log("Error findOrCreate user:", err);
        return res.redirect('/');
      }
      if (req.session.user) {
      	console.log("logged in already", req.session.user);
      	if (u === '' || u === req.session.user.email ) {
      		console.log('go home fine');
      		return res.redirect('/home');
      	} else {
    			console.log('logout', user.email);
					User.publishUpdate(req.session.user.id, {loggedIn: 0});
					req.session.user = undefined;
					return res.redirect('/');
      	}
      }
      if (user && user.password) {
        var match = bcrypt.compareSync(p, user.password);
        if (match) {
          user.loggedIn = 1;
          user.save(function (err) {
            if (err) {
              console.log('Error logging in');
              return res.redirect('/');
            } else {
              User.publishUpdate(user.id, {loggedIn: 1 });
              req.session.user = user;
              return res.redirect('/home');
            }
          });
        } else {
          console.log('Invalid password');
          return res.redirect('/');
        }
      } else {
        console.log('make new user', user);
        //req.session.user = user;
        return res.redirect('/home');
      }
		});
	},

	logout: function (req, res) {
		if (req.session.user) {
			User.findOne(req.session.user.id, function (err, user) {
				User.publishUpdate(user.id, {loggedIn: 0});
				req.session.user = undefined;
			});
		}
		return res.redirect('/');
	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AuthController)
   */
  config: {}

  
};
