const express = require('express');
const router = express.Router();

// @desc    Login page
// @route   GET /login
router.get("/login", (req, res) => res.render("login"));

// @desc    Registration page
// @route   GET /register
router.get("/register", (req, res) => res.render("register"));

// @desc    Board
// @route   GET /board/:id
router.get("/board/:id", (req, res) => res.render("board", {data: null}));

module.exports = router;