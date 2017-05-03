'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var index = path + '/public/index.html';
var unAuth = { user: { _id: false } };
var data = {};

module.exports = function (app, passport, primus) {

	function isLoggedIn(req, res, next) {
		// console.log('starting isAuthenticated');
		// console.log('req.session');
		// console.log(req.session);
		if (req.isAuthenticated()) {
			console.log('isAuthenticated true');
			return next();
		} else {
			console.log('isAuthenticated false');
			console.log(req.url);
			res.json({ user: { _id: false } });
		}
	}

	var clickHandler = new ClickHandler();
	// clickHandler.addDefault();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(index);
		});


	app.post('/signup', (req, res, next) => {
		passport.authenticate('local-signup', function (err, user, text) {
			console.log('/signup');
			console.log(user);
			console.log(text);
			if (err) { return next(err); }
			if (!user) {
				data = unAuth;
				data.user.error = { type: 'signup', message: text.message }
				console.log(data);
				return res.json(data);
			}
			req.logIn(user, function (err) {
				if (err) { return res.status(401).send({ ok: err }); }
				return res.send({ user });
			});

		})(req, res, next);
	});

	app.route('/login')
		.post((req, res, next) => {
			passport.authenticate('local-login', function (err, user, text) {
				console.log('/login');
				console.log(user);
				console.log(text);
				if (err) { return next(err); }
				if (!user) {
					data = unAuth;
					data.user.error = { type: 'login', message: text.message }
					console.log(data);
					return res.json(data);
				}
				req.logIn(user, function (err) {
					if (err) { return res.status(401).send({ ok: err }); }
					// return res.send({ "ok": true });
					return res.send({ user });
				});
			})(req, res, next);
		})


	app.route('/update')
		.post(isLoggedIn, clickHandler.update)

	app.route('/logout')
		.get(function (req, res) {
			console.log('/logout req.session');
			req.logout();
			console.log(req.session);
			res.json({ user: { _id: false } });
		});

	// get user info
	app.route('/user/:id')
		.get(isLoggedIn, function (req, res) {
			console.log('is this ever called /user/:id ?');
			// console.log(req.user);
			var user = req.user;
			var data = {user: user};
			console.log(data);
			// res.json({user: {user}});
			res.json(data);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github', { scope: 'email' }));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/'
		}));

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter', { scope: 'email' }));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/'
		}));

	app.route('/auth/google')
		.get(passport.authenticate('google', { scope: ['profile', 'email'] }));

	app.route('/auth/google/callback')
		.get(passport.authenticate('google', {
			successRedirect: '/',
			failureRedirect: '/'
		}));

	app.get('/unlink/local', isLoggedIn, function (req, res) {
		var user = req.user;
		user.local.email = undefined;
		user.local.password = undefined;
		user.save(function (err) {
			res.redirect('/');
		});
	});

	app.get('/unlink/facebook', isLoggedIn, function (req, res) {
		var user = req.user;
		user.facebook.token = undefined;
		user.save(function (err) {
			res.redirect('/');
		});
	});


	app.get('/unlink/twitter', isLoggedIn, function (req, res) {
		var user = req.user;
		user.twitter.token = undefined;
		user.save(function (err) {
			res.redirect('/');
		});
	});


	app.get('/unlink/google', isLoggedIn, function (req, res) {
		var user = req.user;
		user.google.token = undefined;
		user.save(function (err) {
			res.redirect('/');
		});
	});


	primus.on('connection', function connection(spark) {
		// console.log('new connection ' + spark.id);
		// primus.write('data');

		/**
		 * Wait for all data to be received from the client
		 */
		spark.on('data', function received(data) {
			var sourceId = spark.id;
			// console.log('source id');
			// console.log(sourceId);
			if (typeof data === 'object') {
				// console.log(spark.id, 'received data:');
				// console.log(typeof data);
				// console.log(data);
				/**
				 * Send the message to all clients
				 */
				primus.forEach(function (spark, id, connections) {

					if (sourceId !== spark.id && typeof data !== 'string') {
						// console.log('sending to ' + spark.id + ' this data:');
						// console.log(data);

						spark.write(data);
					}

				});
			}
		});
	});

	// app.route('/api/books')
	// 	.get(isLoggedIn, clickHandler.getAllBooks)
	// 	.post(isLoggedIn, clickHandler.addBook)
	// 	.put(isLoggedIn, clickHandler.editBook)
	// 	.delete(isLoggedIn, clickHandler.deleteBook)


};