'use strict';

module.exports = {
	'githubAuth': {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/github/callback'
	},
	'twitterAuth': {
		'clientID': process.env.TWITTER_KEY,
		'clientSecret': process.env.TWITTER_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/twitter/callback'
	},
	'facebookAuth': {
		'clientID': process.env.FACEBOOK_KEY,
		'clientSecret': process.env.FACEBOOK_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/facebook/callback'
	},
	'googleAuth': {
		'clientID': process.env.GOOGLE_KEY,
		'clientSecret': process.env.GOOGLE_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/google/callback'
	}
};
