const Task = require("../models/task");

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

exports.updateTask = (req, res) => {
    const task_id = +req.params.id;
    const status = req.body.status;

    Task.findByPk(task_id)
        .then((task) => {
            task.status = status;
            task.save();
        })
        .catch((err) => console.error("Update error: ", err));
};

exports.deleteTask = (req, res) => {
    const task_id = +req.params.id;

    Task.findByPk(task_id)
        .then((task) => {
            task.destroy();
        })
        .catch((err) => console.error("Delete error: ", err));
};
