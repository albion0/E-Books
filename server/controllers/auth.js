const bcrypt = require("bcryptjs");

// Imports: local files.
const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");
const { statusCodes } = require("../config");
const { ApiError } = require("../utils/classes");
const { jwt } = require("../utils/functions");
const { User: userRole, Admin } = require("../middlewares/roles");

/**
 * @description Sign up a new user.
 * @route       POST /api/auth/register.
 * @access      Public.
 */
const signup = asyncHandler(async (request, response, next) => {
  const { username, email, password, passwordConfirm, credits } = request.body;

  if (password !== passwordConfirm) {
    next(
      new ApiError(
        "Password doesnt match!",
        "SAME_PASSWORD",
        statusCodes.BAD_REQUEST
      )
    );
    return;
  }

  const userExists = (await User.countDocuments({ email })) > 0;
  if (userExists) {
    next(
      new ApiError(
        "User exists with given email!",
        "USER_EXISTS",
        statusCodes.UNPROCESSABLE
      )
    );
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hash,
    role: userRole,
    credits,
  });
  if (!user) {
    next(
      new ApiError(
        "Failed to create user!",
        "FAILED_USER_CREATE",
        statusCodes.INTERNAL_ERROR
      )
    );
    return;
  }

  response.status(statusCodes.OK).json({
    success: true,
    data: { sent: true, userId: user._id },
    error: null,
  });
});

/**
 * @description Login user.
 * @route       POST /api/auth/login.
 * @access      Public.
 */
const login = asyncHandler(async (request, response, next) => {
  const { email, password } = request.body;

  const user = await User.findOne({
    email,
    role: userRole,
    isDeleted: false,
  });
  const admin = await User.findOne({
    email,
    role: Admin,
    isDeleted: false,
  });
  if (!user && !admin) {
    next(
      new ApiError(
        "Invalid Credentials!",
        "INVALID_CREDENTIALS",
        statusCodes.UNAUTHORIZED
      )
    );
    return;
  }

  if (user && !user.accountConfirmed) {
    next(
      new ApiError(
        "Unconfirmed account!",
        "UNCONFIRMED_ACCOUNT",
        statusCodes.UNAUTHORIZED
      )
    );
    return;
  }

  let samePassword = null;
  if (user) samePassword = await User.comparePasswords(password, user.password);
  else if (admin)
    samePassword = await User.comparePasswords(password, admin.password);

  if (!samePassword) {
    next(
      new ApiError(
        "Invalid Credentials!",
        "INVALID_CREDENTIALS",
        statusCodes.UNAUTHORIZED
      )
    );
    return;
  }

  let tokenPayload = {};
  if (user)
    tokenPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
  else if (admin)
    tokenPayload = { id: admin._id, email: admin.email, role: admin.role };

  const tokenResult = await jwt.sign({ ...tokenPayload });
  if (!tokenResult.success) {
    next(
      new ApiError(
        tokenResult.error,
        "FAILED_SIGN_TOKEN",
        statusCodes.INTERNAL_ERROR
      )
    );
    return;
  }

  const { token } = tokenResult.data;
  response
    .status(statusCodes.OK)
    .json({ success: true, data: { token }, error: null });
});

// Exports of this file.
module.exports = {
  signup,
  login,
};
