const User = require("../models/user");
const Board = require("../models/board");
const db = require("../config/database");
const HasAccess = db.models["has_access"];
const { Op } = require("sequelize");
exports.getUserDashboard = (req, res) => {
  user_id = +req.params.id;
  if (user_id !== req.session.user_id) {
    return res.redirect("/signin");
  }

  User.findByPk(user_id)
    .then((user) => {
      Board.findAll({ where: { owner_id: user_id }, raw: true })
        .then((boards) => {
          Board.findAll({
            raw: true,
            include: [
              {
                model: User,
                through: HasAccess,
              },
            ],
            where: {
              owner_id: {
                [Op.not]: user_id,
              },
              "$users.has_access.user_id$": user_id,
            },
          })
            .then((otherBoards) => {
              console.log(otherBoards);
              res.render("user", {
                boards: boards,
                otherBoards: otherBoards,
                user_name: user.name,
              });
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
