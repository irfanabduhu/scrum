// const User = require("../models/user");

exports.getUserDashboard = (req, res) => {
    user_id = +req.params.id;
    if (user_id !== req.session.user_id) {
        return res.redirect("/signin");
    }

    res.render("user.ejs");
};
