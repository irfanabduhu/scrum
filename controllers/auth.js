const bcrypt = require("bcrypt");
const { session } = require("passport");

const User = require("../models/user");

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

exports.getHomePage = (req, res) => {
    user_id = req.session.user_id;
    if (user_id) {
        res.redirect(`/user/${user_id}`);
    } else {
        res.redirect("/signup");
    }
};

exports.getSignIn = (req, res, next) => res.render("signin");
exports.getSignUp = (req, res, next) => res.render("signup");

exports.postSignIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ where: { email: email } })
        .then((user) => {
            if (user) {
                const passwordMatch = bcrypt.hash(password, user.password);
                if (passwordMatch) {
                    console.log("Sign in successful");
                    req.session.user_id = user.id;
                    console.log(req.session);
                    res.redirect(`/user/${user.id}`);
                } else {
                    console.log("Password didn't match. Try again");
                    res.redirect("/signin");
                }
            } else {
                console.log(`There is no user with ${email}. Please sign up.`);
                res.redirect("/signup");
            }
        })
        .catch((err) => console.error(err));
};

exports.postSignUp = (req, res, next) => {
    console.log("here i am");
    const email = req.body.email;
    const name = req.body.name;
    const password = generateHash(req.body.password);

    User.findOne({ where: { email: email } })
        .then((user) => {
            if (user) {
                console.log(
                    `A user with email: ${email} already exists. Please sign in.`
                );
                return res.redirect("/signin");
            }

            User.create({
                email: email,
                name: name,
                password: password,
            })
                .then((user) => {
                    req.session.user_id = user.id;
                    console.log(req.session);
                    res.redirect(`/user/${user.id}`);
                })
                .catch((err) =>
                    console.log("New user cannot be created. Error: ", err)
                );
        })
        .catch((err) => console.error("Sign up: look up failed. Error: ", err));
};

exports.getSignOut = (req, res, next) => {
    // console.log("User ", req.user);
    // remove the req.user property and clear the login screen
    // req.logout();

    // console.log(req.session);
    // destroy session data
    req.session.destroy();

    //redirect to homepage
    res.redirect("/signin");
};
