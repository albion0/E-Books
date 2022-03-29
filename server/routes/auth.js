const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth");

// Imports: local files.
const authorize = require("../middlewares/authorizeUser");
const protect = require("../middlewares/protect");
const { User } = require("../middlewares/roles");
const { signup, login } = require("../controllers/auth");
const {
  validateUserId,
  signupUser,
  loginUser,
} = require("../validations/auth");
const { validate } = require("../utils/functions");

// router.post("/login", authControllers.postLogin);
// router.post("/register", authControllers.postRegister);
router.route("/login").post(validate(signupUser), signup);
router.route("/register").post(validate(loginUser), login);
// router.post("/reset-password", authControllers.postResetPassword);

module.exports = router;
