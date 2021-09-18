const User = require("../models/user");
const Board = require("../models/board");

exports.getUserDashboard = (req, res) => {
    user_id = +req.params.id;
    if (user_id !== req.session.user_id) {
        return res.redirect("/signin");
    }

    User.findByPk(user_id)
        .then((user) => {
            Board.findAll({ where: { owner_id: user_id } })
                .then((boards) =>
                    res.render("user.ejs", {
                        boards: boards,
                        user_name: user.name,
                    })
                )
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};
