const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../db/models');

module.exports = app => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email'
    },
    async function(email, password, done) {
      try {
        const user = await User.findOne({ where: { email }});
        const correctPassword = user && await user.checkPassword(password);
        if (!user || !correctPassword) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (err) {
        console.log(err);
        return done(err);
      }

      // User.findOne({ where: { email } }, function(err, user) {
      //   if (err) { return done(err); }
      //   if (!user || !user.validPassword(password)) {
      //     return done(null, false, { message: 'Incorrect username/password combo.' });
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
    cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
    User.findByPk(id)
      .then(user => cb(null, user))
      .catch(err => cb(err));
  });
  
  app.use(passport.initialize());
  app.use(passport.session());
}

