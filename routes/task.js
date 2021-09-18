// /board/update-task/${task_id}`,
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

// @desc    Create a new task
// @route   POST /task/add-task/
router.post("/add-task", taskController.postNewTask);

// @desc    Update a task
// @route   PATCH /task/update-task/:id
router.patch("/update-task/:id", taskController.updateTask);

// @desc    delete a task
// @route   DELETE /task/delete-task/
router.delete("/delete-task/:id", taskController.deleteTask);

module.exports = router;
