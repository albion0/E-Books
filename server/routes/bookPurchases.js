// Imports: third-party packages.
const express = require("express");
const router = express.Router();

// Imports: local files.
const authorize = require("../middlewares/authorizeUser");
const protect = require("../middlewares/protect");
const { Admin, User } = require("../middlewares/roles");
const { getAll, getOne, create } = require("../controllers/bookPurchases");
const {
  getAllBookPurchases,
  createBookPurchase,
  validateBookPurchaseId,
} = require("../validations/bookPurchases");
const { validate } = require("../utils/functions");

// Mount routes accordingly.
router.route("/").get(validate(getAllBookPurchases), getAll);
router
  .route("/")
  .post(authorize, protect(Admin, User), validate(createBookPurchase), create);

router.route("/:bookPurchaseId").get(validate(validateBookPurchaseId), getOne);
// Exports of this file.
module.exports = router;
