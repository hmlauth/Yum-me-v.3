const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('hi');
        console.log(username);
        db.User.findOne({
            username: username
        }).then(function(user) {
            console.log(user);
            
            if (!user) {
                return done(null, false, {message: "User not found :)"});
            }
            if (!user.validPassword(password, user.password)) {
                return done(null, false, {message: "invalid password"});
            } else {
                return done(null, user)
            }
            
        }).catch(function(err) {
            console.log("something went wrong\n",err);
            return done(err)
        });
    }
  ));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.User.findById(id, function(err, user) {
        done(err, user);
    });
});


module.exports = passport;