const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/auth');

router.post("/login", authControllers.postLogin);
router.post("/register", authControllers.postRegister);
router.post("/reset-password", authControllers.postResetPassword);

module.exports = router;