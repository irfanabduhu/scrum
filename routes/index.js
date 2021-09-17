const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth");

// @desc    Sign in page
// @route   GET /signin
router.get("/signin", userController.getSignIn);

// @desc    Sign up page
// @route   GET /signup
router.get("/signup", userController.getSignUp);
router.get("/", userController.getHomePage);

// @desc    Sign in page
// @route   POST /signin
router.post("/signin", userController.postSignIn);

// @desc    Sign up page
// @route   POST /signup
router.post("/signup", userController.postSignUp);

// @desc    Sign out page
// @route   POST /signout
router.get("/signout", userController.getSignOut);

// @desc    Handle unauthorised access
// @route   POST /signout
router.get("/access-denied", (req, res) => res.render("access-denied"));

module.exports = router;
