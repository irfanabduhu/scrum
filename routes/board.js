const express = require("express");
const router = express.Router();

const boardController = require("../controllers/board");

// @desc    Create a new board
// @route   GET /board/create-board
router.get("/create-board", boardController.getCreateBoard);

// @desc    Create a new board
// @route   POST /board/create-board
router.post("/create-board", boardController.postCreateBoard);

// @desc    Create a new task
// @route   POST /board/add-task/
router.post("/add-task", boardController.postNewTask);

// @desc    Get the specified Board
// @route   GET /board/:id
router.get("/:id", boardController.getBoardById);

module.exports = router;
