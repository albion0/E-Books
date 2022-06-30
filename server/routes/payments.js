// Imports: third-party packages.
const express = require("express");
const router = express.Router();

// Imports: local files.
const authorize = require("../middlewares/authorizeUser");
const protect = require("../middlewares/protect");
const { Admin, User } = require("../middlewares/roles");
const {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne,
} = require("../controllers/payments");
const {
  getAllPayments,
  createPayment,
  updatePayment,
  validatePaymentId,
} = require("../validations/payments");
const { validate } = require("../utils/functions");

// Mount routes accordingly.
router.route("/").get(validate(getAllPayments), getAll);
router
  .route("/")
  .post(authorize, protect(Admin, User), validate(createPayment), create);

router.route("/:paymentId").get(validate(validatePaymentId), getOne);
router
  .route("/:paymentId")
  .put(authorize, protect(Admin, User), validate(updatePayment), updateOne);
router
  .route("/:paymentId")
  .delete(authorize, protect(Admin), validate(validatePaymentId), deleteOne);

// Exports of this file.
module.exports = router;
