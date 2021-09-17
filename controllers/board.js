const Board = require("../models/board");
const Task = require("../models/task");

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
        .then((board) => res.redirect(`/board/${board.id}`))
        .catch((err) => console.error(err));
};

exports.postNewTask = (req, res) => {
    console.log("Creating a new task");
    const task_name = req.body.taskName;
    const board_id = req.session.board_id;
    Task.create({
        text: task_name,
        status: "todo",
        board_id: board_id,
    })
        .then(() => {
            console.log("created");
            res.redirect(`/board/${board_id}`);
        })
        .catch((err) => console.err(err));
};

exports.getBoardById = (req, res) => {
    console.log("PARAMETERS ", req.params);
    console.log("Board id: ", req.params.id);
    board_id = +req.params.id;
    user_id = req.session.user_id;
    req.session.board_id = board_id; // later used in task creation

    Board.findByPk(board_id)
        .then((board) => {
            if (board.owner_id != user_id) {
                console.log("Access denied.");
                return res.redirect("/access-denied");
            }

            Task.findAll({ where: { board_id: board_id } })
                .then((tasks) => {
                    const todo = tasks.filter((task) => task.status === "todo");
                    const doing = tasks.filter(
                        (task) => task.status === "doing"
                    );
                    const review = tasks.filter(
                        (task) => task.status === "review"
                    );
                    const done = tasks.filter((task) => task.status === "done");
                    todo.map((task) => console.log(task.text));
                    res.render("board", {
                        board_title: board.title,
                        todo: todo,
                        doing: doing,
                        review: review,
                        done: done,
                    });
                })
                .catch((err) => console.log("Task fetch error: ", err));
        })
        .catch((err) => console.error("Board fetch error: ", err));
};
