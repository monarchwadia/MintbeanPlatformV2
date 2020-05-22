const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      if (username === 'username' && password === 'password') {
        done(null, { username: 'username' });
      } else {
        done(null, false, { message: 'Incorrect username + password combo.' })
      }
      // User.findOne({ username: username }, function(err, user) {
      //   if (err) { return done(err); }
      //   if (!user) {
      //     return done(null, false, { message: 'Incorrect username.' });
      //   }
      //   if (!user.validPassword(password)) {
      //     return done(null, false, { message: 'Incorrect password.' });
      //   }
      //   return done(null, user);
      // });
    }
  ));

  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.

  passport.serializeUser(function(user, cb) {
    cb(null, user.username);
  });
  
  passport.deserializeUser(function(username, cb) {
    cb(null, { username })
    // db.users.findById(id, function (err, user) {
    //   if (err) { return cb(err); }
    //   cb(null, user);
    // });
  });
  
  app.use(passport.initialize());
  app.use(passport.session());
}

