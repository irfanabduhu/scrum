const Board = require("../models/board");
const Task = require("../models/task");
const User = require("../models/user");
const sequelize = require("../config/database");

const HasAccess = sequelize.models["has_access"];

exports.getCreateBoard = (req, res) => res.render("create-board.ejs");

exports.postCreateBoard = (req, res) => {
  const title = req.body.title;
  const owner_id = req.session.user_id;
  console.log(owner_id);
  console.log("creating a new board");
  Board.create({
    title: title,
    owner_id: owner_id,
  })
    .then((board) => {
      HasAccess.create({
        board_id: board.id,
        user_id: owner_id,
      });
      res.redirect(`/board/${board.id}`);
    })
    .catch((err) => console.error(err));
};

exports.getEditBoard = (req, res) => {
  const board_id = +req.params.id;
  const user_id = req.session.user_id;
  Board.findByPk(board_id)
    .then((board) =>
      res.render("edit-board", {
        board_id: board_id,
        board_title: board.title,
      })
    )
    .catch((err) => console.log(err));
};

exports.postEditBoard = (req, res) => {
  const board_id = +req.params.id;
  const title = req.body.title;
  Board.findByPk(board_id)
    .then((board) => {
      board.title = title;
      board.save();
      res.redirect(`/board/${board_id}`);
    })
    .catch((err) => console.log(err));
};

exports.postShareBoard = (req, res) => {
  const board_id = +req.params.id;
  const email = req.body.email;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user == null) {
        return res.redirect(`/board/${board_id}`);
      }

      const user_id = user.id;
      HasAccess.create({
        user_id: user_id,
        board_id: board_id,
      });
      res.redirect(`/board/${board_id}`);
    })
    .catch((err) => console.error(err));
};

exports.postDeleteBoard = (req, res) => {
  const board_id = +req.params.id;
  const title = req.body.title;
  const user_id = req.session.user_id;
  Board.findByPk(board_id).then((board) => {
    if (title != board.title) {
      return res.redirect(`/user/${user_id}`);
    }

    board.destroy();
    return res.redirect(`/user/${user_id}`);
  });
};

exports.getBoardById = (req, res) => {
  const board_id = +req.params.id;
  const user_id = req.session.user_id;
  req.session.board_id = board_id; // later used in task creation

  Board.findByPk(board_id)
    .then((board) => {
      HasAccess.findOne({
        where: { board_id: board_id, user_id: user_id },
      }).then((access) => {
        if (access == null) {
          console.log("Access denied.");
          return res.redirect("/access-denied");
        }
        const is_owner = board.owner_id == user_id;
        Task.findAll({ where: { board_id: board_id } })
          .then((tasks) => {
            const todo = tasks.filter((task) => task.status === "todo");
            const doing = tasks.filter((task) => task.status === "doing");
            const review = tasks.filter((task) => task.status === "review");
            const done = tasks.filter((task) => task.status === "done");
            todo.map((task) => console.log(task.text));
            res.render("board", {
              is_owner: is_owner,
              board_id: board.id,
              board_title: board.title,
              todo: todo,
              doing: doing,
              review: review,
              done: done,
            });
          })
          .catch((err) => console.log("Task fetch error: ", err));
      });
    })
    .catch((err) => console.error("Board fetch error: ", err));
};
