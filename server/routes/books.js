// Imports: third-party packages.
const express = require("express");
const router = express.Router();

// Imports: local files.
const authorize = require("../middlewares/authorizeUser");
const protect = require("../middlewares/protect");
const { Admin } = require("../middlewares/roles");
const {
  getAll,
  getOne,
  create,
  uploadPhoto,
  updateOne,
  deleteOne,
  buyBook,
  userBooks,
  downloadBook,
  bookReview,
  getBookReviews
} = require("../controllers/books");
const {
  getAllBooks,
  createBook,
  updateBook,
  validateBookId,
  download
} = require("../validations/books");
const { validate } = require("../utils/functions");

// Mount routes accordingly.
router.route("/").get(validate(getAllBooks), getAll);
router.route("/").post(authorize, protect(Admin), validate(createBook), create);

router.route("/:bookId").get(validate(validateBookId), getOne);
router.route("/:bookId/photo").put(validate(validateBookId), uploadPhoto);
router
  .route("/:bookId")
  .put(authorize, protect(Admin), validate(updateBook), updateOne);
router
  .route("/:bookId")
  .delete(authorize, protect(Admin), validate(validateBookId), deleteOne);
router.route("/:bookId/:userId").post(authorize, buyBook);
router.route("/:userId/:page/:limit").get(authorize, userBooks);

router.route("/:bookId/generate").get(validate(download), downloadBook);
router.route("/:bookId/:userId/review").post(authorize, bookReview);
router.route("/:bookId/reviews").get(authorize, getBookReviews);

// Exports of this file.
module.exports = router;