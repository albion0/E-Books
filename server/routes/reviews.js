// Imports: third-party packages.
const express = require("express");
const router = express.Router();

// Imports: local files.
const authorize = require("../middlewares/authorizeUser");
const protect = require("../middlewares/protect");
const { Admin, User } = require("../middlewares/roles");
const { getAll } = require("../controllers/reviews");
const { getAllReviews } = require("../validations/reviews");
const { validate } = require("../utils/functions");

// Mount routes accordingly.
router.route("/").get(validate(getAllReviews), getAll);

// Exports of this file.
module.exports = router;
