const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

passport.use(
    "local-signup",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true, // pass the entire request to the callback
        },
        function (req, email, password, done) {
            User.findOne({
                where: {
                    email: email,
                },
            }).then((user) => {
                if (user) {
                    return done(null, false, {
                        message: "That email is already taken",
                    });
                }
                const data = {
                    email: req.body.email,
                    password: generateHash(password),
                    name: req.body.name,
                };
                User.create(data).then((newUser, created) => {
                    if (!newUser) {
                        return done(null, false);
                    }
                    return done(null, newUser);
                });
            });
        }
    )
);
