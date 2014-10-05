/**
 * UserController
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

module.exports = {

	me: function (req, res) {
		if (req.session.user) {
			User.findOne(req.session.user.id, function (err, user) {
				return res.json(user);
			});
		} else {
			return res.json({});
		}
	},

	edit: function (req, res) {
		var firstName = req.param('firstName') || '';
		var lastName = req.param('lastName') || '';
		var bio = req.param('bio') || '';
		var lastName = req.param('lastName') || '';
		var bio = req.param('bio') || '';
		var dogName = req.param('dogName') || '';
		var dogAge = req.param('dogAge') || '';
		var dogBreed = req.param('dogBreed') || '';
		var dogGender = req.param('dogGender') || '';
		var dogBio = req.param('dogBio') || '';
		console.log(typeof firstName);
		console.log(dogGender);
		if (req.session.user) {
			var user = User.findOne(req.session.user.id, function (err, user) {
				if (err) {
					console.log(err);
				} else {
					user['firstName'] = firstName;
					user['lastName'] = lastName;
					user['bio'] = bio;
					user['dogName'] = dogName;
					user['dogAge'] = dogAge;
					user['dogBreed'] = dogBreed;
					user['dogGender'] = dogGender;
					user['dogBio'] = dogBio;

					user.save(function (err) {
						if (err) {
							console.log(err);
						} else {
							console.log(user);
							//req.send(user);
						}
					});
				}
        return res.redirect('/user/me');				
			});
		} else {
			return res.redirect('/');
		}
	},
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};