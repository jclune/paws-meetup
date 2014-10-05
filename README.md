# paws meetup
### full stack javascript! \(^^)/
### a Sails application
sails.js documentation: http://sailsjs.org/#documentation

### uses Knockout (KO) for data binding
knockout.js documentation: http://knockoutjs.com/

### website
http://localhost:1337

### API
# user list
http://localhost:1337/user

# user, id=1
http://localhost:1337/user/1

# logged in user
http://localhost:1337/user/me

# create user by registration
http://localhost:1337

# create user by url
http://localhost:1337/user/create?email=something&password=something

email: {
	type: 'string',
	unique: true,
	required: true
},
password: {
	type: 'string',
	required: true,
},
firstName: 'string',
lastName: 'string',
loggedIn: 'boolean',
isAdmin: 'boolean',

# meetup list
http://localhost:1337/meetup

# meetup, id=1
http://localhost:1337/meetup/1

# create meetup by url
http://localhost:1337/meetup/create?title=something

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