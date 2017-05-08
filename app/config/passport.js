'use strict';

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        // console.log('serializeUser');
        // console.log(user);
        done(null, user.id);
    });


    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            // console.log('deserializeUser');
            // console.log(user);
            done(err, user);
        });
    });

	/**
	 * Local Login
	 */
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
        function (req, email, password, done) {
            // console.log('login');
            // console.log(email);
            // console.log(password);
            if (email) {
                email = email.toLowerCase();
            }

            process.nextTick(function () {
                User.findOne({ 'local.email': email }, function (err, user) {
                    // console.log('User:');
                    // console.log(user);
                    if (err) {
                        return done(err);
                    }

                    // if no user is found, return the message
                    if (!user) {
                        // console.log('user not found');
                        return done(null, false,  { message: 'Email not found!' });
                    }

                    if (!user.validPassword(password)) {
                        // console.log('bad password');
                        return done(null, false, { message: 'Wrong password!' });
                    }
                    // all is well, return user
                    else {
                        // console.log('returning user');
                        return done(null, user);
                    }
                });
            });

        }));

	/**
	 * Local Signup
	 */

    passport.use('local-signup', new LocalStrategy({
        /**
         * Use email as the username
         */
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },

        function (req, email, password, done) {
            // console.log('local-signup');
            // console.log(email);
            if (email) {
                email = email.toLowerCase();
            }

            process.nextTick(function () {
                if (!req.user) {
                    User.findOne({ 'local.email': email }, function (err, user) {
                        // console.log('signup findone user');
                        // console.log(user);
                        if (err) {
                            return done(err);
                        }

                        /**
                         * Check for existing user
                         */
                        if (user) {
                            // console.log('user name taken');
                            return done(null, false, { message: 'That email is already taken.' });
                        } else {
                            var newUser = new User();

                            newUser.local.email = email;
                            newUser.local.password = newUser.generateHash(password);

                            newUser.save(function (err) {
                                if (err) {
                                    return done(err);
                                }
                                return done(null, newUser);
                            });
                        }

                    });

                    /**
                     * Logged but has no local account
                     */
                } else if (!req.user.local.email) {

                    User.findOne({ 'local.email': email }, function (err, user) {
                        if (err) {
                            return done(err);
                        }
                        /**
                         * Check for existing user
                         */
                        if (user) {
                            return done(null, false, { message: 'That email is already taken.' });
                        } else {
                            var user = req.user;
                            user.local.email = email;
                            user.local.password = user.generateHash(password);
                            user.save(function (err) {
                                if (err) {
                                    return done(err);
                                }
                                return done(null, user);
                            });
                        }
                    });
                } else {
                    /**
                     * Logged in and already has an account
                     *  return the user
                     */
                    return done(null, req.user);
                }

            });

        }
    ));

	/**
	 * Facebook
	 */
    passport.use(new FacebookStrategy({

        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        passReqToCallback: true

    },
        function (req, token, refreshToken, profile, done) {

            process.nextTick(function () {


                if (!req.user) {

                    User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                        if (err) {
                            return done(err);
                        }
                        /**
                         * Check for existing user
                         */
                        if (user) {

                            /**
                             * Check for token
                             *  if none user was unlinked
                             */
                            if (!user.facebook.token) {
                                user.facebook.token = token;
                                user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                                user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                                user.save(function (err) {
                                    if (err) {
                                        return done(err);
                                    }

                                    return done(null, user);
                                });
                            }

                            return done(null, user);
                        } else {

                            var newUser = new User();

                            newUser.facebook.id = profile.id;
                            newUser.facebook.token = token;
                            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                            newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

                            newUser.save(function (err) {
                                if (err) {
                                    return done(err);
                                }
                                return done(null, newUser);
                            });
                        }
                    });

                } else {
                    /**
                     * Link existing account
                     */
                    var user = req.user;

                    user.facebook.id = profile.id;
                    user.facebook.token = token;
                    user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                    user.save(function (err) {
                        if (err) {
                            return done(err);
                        }

                        return done(null, user);
                    });

                }
            });

        }));

	/**
	 * Twitter
	 */
    passport.use(new TwitterStrategy({

        consumerKey: configAuth.twitterAuth.clientID,
        consumerSecret: configAuth.twitterAuth.clientSecret,
        callbackURL: configAuth.twitterAuth.callbackURL,
        passReqToCallback: true

    },
        function (req, token, tokenSecret, profile, done) {

            process.nextTick(function () {
                console.log('twitter profile');
                console.log(profile);
                /**
                 * Check if logged in
                 */
                if (!req.user) {

                    User.findOne({ 'twitter.id': profile.id }, function (err, user) {
                        if (err) {
                            return done(err);
                        }

                        if (user) {
                            /**
                             * Check for token
                             *  if none user was unlinked
                             */
                            if (!user.twitter.token) {
                                user.twitter.token = token;
                                user.twitter.email = profile.username;
                                user.twitter.name = profile.displayName;

                                user.save(function (err) {
                                    if (err) {
                                        return done(err);
                                    }

                                    return done(null, user);
                                });
                            }

                            return done(null, user);
                        } else {
                            /**
                             * Create a new user
                             */
                            var newUser = new User();

                            newUser.twitter.id = profile.id;
                            newUser.twitter.token = token;
                            newUser.twitter.email = profile.username;
                            newUser.twitter.name = profile.displayName;

                            newUser.save(function (err) {
                                if (err) {
                                    return done(err);
                                }
                                return done(null, newUser);
                            });
                        }
                    });

                } else {

                    var user = req.user;

                    user.twitter.id = profile.id;
                    user.twitter.token = token;
                    user.twitter.email = profile.username;
                    user.twitter.name = profile.displayName;

                    user.save(function (err) {
                        if (err) {
                            return done(err);
                        }

                        return done(null, user);
                    });
                }

            });

        }));

	/**
	 * Google
	 */
    passport.use(new GoogleStrategy({

        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        passReqToCallback: true

    },
        function (req, token, refreshToken, profile, done) {

            process.nextTick(function () {

                /**
                 * Check if logged in
                 */
                if (!req.user) {

                    User.findOne({ 'google.id': profile.id }, function (err, user) {
                        if (err) {
                            return done(err);
                        }

                        if (user) {
                            /**
                             * Check for token
                             *  if none user was unlinked
                             */
                            if (!user.google.token) {
                                user.google.token = token;
                                user.google.name = profile.displayName;
                                user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                                user.save(function (err) {
                                    if (err) {
                                        return done(err);
                                    }

                                    return done(null, user);
                                });
                            }

                            return done(null, user);
                        } else {
                            var newUser = new User();

                            newUser.google.id = profile.id;
                            newUser.google.token = token;
                            newUser.google.name = profile.displayName;
                            newUser.google.email = (profile.emails[0].value || '').toLowerCase();

                            newUser.save(function (err) {
                                if (err) {
                                    return done(err);
                                }
                                return done(null, newUser);
                            });
                        }
                    });

                } else {
                    /**
                     * Link existing accounts
                     */
                    var user = req.user;

                    user.google.id = profile.id;
                    user.google.token = token;
                    user.google.name = profile.displayName;
                    user.google.email = (profile.emails[0].value || '').toLowerCase();

                    user.save(function (err) {
                        if (err) {
                            return done(err);
                        }

                        return done(null, user);
                    });

                }

            });

        }));

};
