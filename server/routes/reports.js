// Imports: third-party packages.
const express = require("express");
const router = express.Router();

// Imports: local files.
const authorize = require("../middlewares/authorizeUser");
const protect = require("../middlewares/protect");
const { Admin } = require("../middlewares/roles");
const {
  getCounts,
  getBooks,
  getPayments,
  getBookPurchases,
  getReviews,
  getForum,
} = require("../controllers/reports");
const {
  validateCounts,
  validateBooks,
  validatePayments,
  validateBookPurchases,
  validateReviews,
  validateForum,
} = require("../validations/reports");
const { validate } = require("../utils/functions");

// Mount routes accordingly.
router
  .route("/counts")
  .post(authorize, protect(Admin), validate(validateCounts), getCounts);
router
  .route("/books")
  .post(authorize, protect(Admin), validate(validateBooks), getBooks);
router
  .route("/payments")
  .post(authorize, protect(Admin), validate(validatePayments), getPayments);
router
  .route("/bookPurchases")
  .post(
    authorize,
    protect(Admin),
    validate(validateBookPurchases),
    getBookPurchases
  );
router
  .route("/reviews")
  .post(authorize, protect(Admin), validate(validateReviews), getReviews);
router
  .route("/forum")
  .post(authorize, protect(Admin), validate(validateForum), getForum);

// Exports of this file.
module.exports = router;
