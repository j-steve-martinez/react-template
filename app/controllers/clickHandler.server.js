'use strict';

// var Books = require('google-books-search');
var User = require('../models/users.js');
// var Book = require('../models/books.js');

function ClickHandler() {

	this.update = (req, res) => {
		// console.log(req.body);
		var data, name, city, state, password;
		name = req.body.name;
		city = req.body.city;
		state = req.body.state;
		password = req.body.password;
		if (password.length === 0) {
			data = {
				name: name,
				city: city,
				state: state
			}
		} else {
			data = {
				name: name,
				city: city,
				state: state,
				password: password
			}
		}
		// console.log(data);
		User.findOneAndUpdate(
			{
				_id: req.body.id
			},
			{
				$set: data
				
			},
			{ new: true },
			(err, user) => {
				if (err) throw err;
				// console.log(user);
				res.json({ user: user });
			}
		);
	}

	// this.addDefault = () => {
	// 	User.find({}, (err, user) => {
	// 		// console.log('default user');
	// 		// console.log(user);
	// 		if (err) throw err;
	// 		if (user.length === 0) {
	// 			var defaultUser = new User({
	// 				email: 'admin@example.com',
	// 				password: 'abc123'
	// 			});
	// 			defaultUser.save((err, data) => {
	// 				if (err) throw err;
	// 				// console.log('default user saved!');
	// 				// console.log(data);
	// 				Book.find({}, (err, book) => {
	// 					// console.log('default book');
	// 					// console.log(book);
	// 					if (err) throw err;
	// 					if (book.length === 0) {
	// 						var defaultBook = new Book({
	// 							uid: data._id,
	// 							bid: "ZbBOAAAAMAAJ",
	// 							title: "Tarzan of the Apes",
	// 							thumbnail: "https://books.google.com/books/content?id=ZbBOAAAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
	// 							isRequest: false,
	// 							isAccept: false,
	// 							lendee: ""
	// 						});
	// 						defaultBook.save((err, data) => {
	// 							if (err) throw err;
	// 							// console.log('default book saved!');
	// 							// console.log(data);
	// 						});
	// 					}
	// 				});
	// 			});
	// 		}
	// 	});
	// }

	// this.addBook = (req, res) => {
	// 	// console.log('addBook');
	// 	// console.log(req.body);
	// 	// console.log(req.session.passport);
	// 	var title, options;

	// 	title = req.body.title;

	// 	options = {
	// 		// field: 'title',
	// 		limit: 1,
	// 		type: 'books',
	// 		lang: 'en',
	// 		// projection: 'lite'
	// 	};

	// 	Books.search(title, options, function (error, results, apiResponse) {
	// 		// console.log('googleBook search results');
	// 		// console.log(error);
	// 		// console.log(results);
	// 		// console.log(apiResponse);
	// 		if (error) {
	// 			// console.log(error);
	// 			throw error;
	// 		} else {
	// 			var thumbnail, url = results[0].thumbnail;
	// 			if (url) {
	// 				thumbnail = url.replace('http:', 'https:');
	// 			}

	// 			var myBook = new Book();
	// 			myBook.title = results[0].title;
	// 			myBook.thumbnail = thumbnail;
	// 			myBook.bid = results[0].id;
	// 			myBook.uid = req.session.passport.user._id

	// 			Book.find({ bid: myBook.bid, uid: myBook.uid }, (err, book) => {
	// 				// console.log('book results');
	// 				// console.log(book);
	// 				if (err) throw err;
	// 				if (book.length) {
	// 					// console.log('sending json');
	// 					res.json({ isExists: true });
	// 				} else {
	// 					// var newPoll = new Poll(data);

	// 					// Saving it to the database.
	// 					myBook.save(function (err, book) {
	// 						if (err) {
	// 							// console.log ('Error on save!');
	// 							res.json({ isError: false });
	// 						}
	// 						// console.log('data saved');
	// 						res.json(book);
	// 					});
	// 				}
	// 			});
	// 			//

	// 		}
	// 	});


	// }

	// this.editBook = (req, res) => {
	// 	// console.log(req.body);
	// 	var book = req.body.book;
	// 	// console.log(book);
	// 	Book.findOneAndUpdate(
	// 		{
	// 			_id: book._id
	// 		},
	// 		{
	// 			$set:
	// 			{
	// 				isAccept: book.isAccept,
	// 				isRequest: book.isRequest,
	// 				lendee: book.lendee
	// 			}
	// 		},
	// 		{ new: true },
	// 		(err, book) => {
	// 			if (err) throw err;
	// 			// console.log(book);
	// 			res.json(book);
	// 		}
	// 	);
	// }

	// this.deleteBook = (req, res) => {
	// 	// console.log('deleteBook');
	// 	var book = req.body.book;
	// 	// console.log(book);
	// 	Book.findByIdAndRemove(book._id)
	// 		.exec((err, book) => {
	// 			if (err) throw err;
	// 			res.json(book)
	// 		});
	// }

	// this.getAllBooks = (req, res) => {
	// 	// console.log('getAllBooks');
	// 	Book.find().exec((err, data) => {
	// 		if (err) throw err;
	// 		// console.log(data);
	// 		res.json(data);
	// 	});
	// }
}

module.exports = ClickHandler;