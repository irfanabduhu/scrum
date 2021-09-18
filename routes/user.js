const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
// @desc    User homepage
// @route   GET /user/:id

router.get("/:id", userController.getUserDashboard);

module.exports = router;
