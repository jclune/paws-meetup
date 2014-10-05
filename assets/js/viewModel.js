//$(document).ready(function() {

var socket = io.connect();

var UserViewModel = function (data) {
	var self = this;
	self.users = ko.observableArray();
	data.forEach(function(user, i) {
		var json = JSON.stringify(user);
		self.users.push({user: user, json: json});
	});
};

var MeetupViewModel = function (data) {
	var self = this;
	self.meetups = ko.observableArray();
	data.forEach(function(meetup, i) {
		var json = JSON.stringify(meetup);
		self.meetups.push({meetup: meetup, json: json});
	});
};

var Me = function (data) {
	var self = this;
	self.me = ko.observable(data);
};

socket.request('/user', function(response) {
	var userViewModel = new UserViewModel(response);

	$(document).ready(function() {
		ko.applyBindings(userViewModel);
	});
});

socket.request('/meetup', function(response) {
	var meetupViewModel = new MeetupViewModel(response);

	$(document).ready(function() {
		ko.applyBindings(meetupViewModel);
	});
});

socket.request('/user/me', function(response) {
	var me = new Me(response);

	$(document).ready(function() {
		ko.applyBindings(me);
	});
});
