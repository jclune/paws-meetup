/**
 * MeetupController
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

	edit: function (req, res) {
		var title= req.param('title') || '';
		var description = req.param('description') || '';
		var creator = req.param('creator') || '';
		var participants = req.param('participants') || '';
		var maxLength = req.param('maxLength') || '';
		var from = req.param('from') || '';
		var to = req.param('to') || '';		
		var deadline = req.param('deadline') || '';		
		var address = req.param('address') || '';
		var business = req.param('business') || '';
		
		console.log(title);

		var meetup = Meetup.findOrCreate({ title: title}, {

			title: title,
			description: description,
			creator: creator,
			participants: participants,
			maxLength: maxLength,
			from: from,
			to: to,
			deadline: deadline,			
			address: address,
			business: business

		}, function(err, meetup) {
			var id = meetup.id;
			if(err) {
        console.log("Error findOrCreate meetup:", err);
        return res.redirect('/meetup_edit');
      }
      // edit meetup
      if (meetup) {
      	meetup.save(function (err) {
					if (err) {
					  console.log('Error logging in');
					  return res.redirect('/meetup_edit');
					} else {
						console.log('save!');
					}				
				});
				return res.redirect('/meetup');
			// create meetup
      } else {
      	console.log('created meetup!');
      	return res.redirect('/meetup');
      }
			
		});
	},
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MeetupController)
   */
  _config: {}

  
};
