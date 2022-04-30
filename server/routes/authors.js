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
  updateOne,
  deleteOne,
} = require("../controllers/authors");
const {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  validateAuthorId,
} = require("../validations/authors");
const { validate } = require("../utils/functions");

// Mount routes accordingly.
router.route("/").get(validate(getAllAuthors), getAll);
router
  .route("/")
  .post(authorize, protect(Admin), validate(createAuthor), create);

router.route("/:authorId").get(validate(validateAuthorId), getOne);
router
  .route("/:authorId")
  .put(authorize, protect(Admin), validate(updateAuthor), updateOne);
router
  .route("/:authorId")
  .delete(authorize, protect(Admin), validate(validateAuthorId), deleteOne);

// Exports of this file.
module.exports = router;
