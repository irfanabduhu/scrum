const express = require("express");
const router = express.Router();

const boardController = require("../controllers/board");

// @desc    Create a new board
// @route   GET /board/create-board
router.get("/create-board", boardController.getCreateBoard);

// @desc    Create a new board
// @route   POST /board/create-board
router.post("/create-board", boardController.postCreateBoard);

// @desc    Edit the specified Board
// @route   GET /board/:id
router.get("/edit-board/:id", boardController.getEditBoard);

// @desc    Update the specified Board
// @route   POST /board/:id
router.post("/update-board/:id", boardController.postEditBoard);

// @desc    Share the specified Board
// @route   POST /board/:id
router.post("/share-board/:id", boardController.postShareBoard);

// @desc    Delete the specified Board
// @route   POST /board/:id
router.post("/delete-board/:id", boardController.postDeleteBoard);

// @desc    Get the specified Board
// @route   GET /board/:id
router.get("/:id", boardController.getBoardById);

module.exports = router;
