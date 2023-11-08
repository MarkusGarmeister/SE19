import passport from "passport";
import { User } from "../model/user.js";
import { validPassword } from "../helper/passwordUtils.js";
import { Strategy as LocalStrategy } from "passport-local";

const customFields = {
    usernameField: "email",
    passwordField: "password",
}

const verifyCallback = (email, password, done) =>{
    User.findOne({ email: email })
      .then(user => {
        if (!user) { return done(null, false)}
        
        const isValid = validPassword(password, user.hash, user.salt)

        if (isValid) {
            return done(null, user)
        } else {
            return done(null, false);
        }
      })
    
}

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy)



export { strategy }