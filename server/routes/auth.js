// Imports: third-party packages.
const express = require("express");
const router = express.Router();

// Imports: local files.
const authorize = require("../middlewares/authorizeUser");
const protect = require("../middlewares/protect");
const { User } = require("../middlewares/roles");
const {
  getAll,
  getOne,
  updateOne,
  uploadLogo,
  deleteOne,
  signup,
  login,
  forgot,
  reset,
} = require("../controllers/auth");
const {
  getAllUsers,
  updateUser,
  validateUserId,
  signupUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../validations/auth");
const { validate } = require("../utils/functions");

// Mount routes accordingly.
router.route("/").get(validate(getAllUsers), getAll);

router.route("/:userId").get(validate(validateUserId), getOne);
router
  .route("/:userId")
  .put(authorize, protect(User), validate(updateUser), updateOne);
router.route("/:userId").delete(validate(validateUserId), deleteOne);

router.route("/:userId/logo").put(validate(validateUserId), uploadLogo);

router.route("/signup").post(validate(signupUser), signup);
router.route("/login").post(validate(loginUser), login);
router.route("/forgot").post(validate(forgotPassword), forgot);
router.route("/reset/:resetToken").post(validate(resetPassword), reset);

// Exports of this file.
module.exports = router;
