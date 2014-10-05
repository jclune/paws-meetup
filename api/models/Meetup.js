/**
 * Meetup
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
schema: true,

  attributes: {
		title: {
			type: 'string',
			unique: true,
			required: true
		},
		description: 'string',
		creator: 'string',
		participants: 'string',
		maxLength: 'integer',
		datetime: 'datetime',
		address: 'string',
		genre: 'string'
  }

};
