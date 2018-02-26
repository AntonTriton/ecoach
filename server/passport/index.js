const passport = require('koa-passport')
let LocalStrategy = require('passport-local').Strategy;
let User = require('../db/schemas/User')

passport.serializeUser(function(user, done) {
  console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {

  console.log('LocalStrategy');
  User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        console.log('LocalStrategy no');
        return done(null, false, { message: 'Incorrect username.' });
      }
      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
      console.log('LocalStrategy success');
      return done(null, user);
    });

}));

module.exports = passport
