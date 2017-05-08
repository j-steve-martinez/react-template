'use strict';

var User = require('../models/users.js');

function ClickHandler() {

	this.update = (req, res) => {
		// console.log('user update');
		// console.log(req.body);

		var type = req.body.type;

		User.findOne({ _id: req.body.id }, (err, user) => {
			if (err) { throw err; }
			// console.log('found user');
			// console.log(type);
			if (type === 'local') {
				if (req.body.name) { user[type].name = req.body.name; }
				if (req.body.password) { user[type].password = req.body.password; }
			}
			if (req.body.city) { user[type].city = req.body.city; }
			if (req.body.state) { user[type].state = req.body.state; }
			user.save((err, data) => {
				if (err) { throw err; }
				// console.log('user saved');
				// console.log(data);
				res.json({ user: data });
			});
		});
	}
}

module.exports = ClickHandler;