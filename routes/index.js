const express = require("express");
const router = express.Router();

// @desc    Homepage
// @route   GET /
router.get("/", (req, res) => res.render("welcome"));

// @desc    Login page
// @route   GET /login
router.get("/login", (req, res) => res.render("login"));

// @desc    Registration page
// @route   GET /register
router.get("/register", (req, res) => res.render("register"));

module.exports = router;
