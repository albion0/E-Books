// Imports: third-party packages.
const express = require("express");
const router = express.Router();

// Imports: local files.
const authorize = require("../middlewares/authorizeUser");
const protect = require("../middlewares/protect");
const { Admin } = require("../middlewares/roles");
const { getCounts } = require("../controllers/reports");
const { validateCounts } = require("../validations/reports");
const { validate } = require("../utils/functions");

// Mount routes accordingly.
router
  .route("/counts")
  .post(authorize, protect(Admin), validate(validateCounts), getCounts);

// Exports of this file.
module.exports = router;
