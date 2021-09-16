const express = require(express);
const router = express.Router();

// @desc    User homepage
// @route   GET /user/:id
router.get("/:id", (req, res) => res.render("user.ejs"));

module.exports = router;
