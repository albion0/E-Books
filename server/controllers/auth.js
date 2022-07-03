// Imports: core node modules.
const crypto = require("crypto");

// Imports: third-party packages.
const bcrypt = require("bcryptjs");

// Imports: local files.
const User = require("../models/User");
const UserAdmin = require("../models/UserAdmin");
const asyncHandler = require("../middlewares/asyncHandler");
const { statusCodes, emails } = require("../config");
const { User: userRole, Admin } = require("../middlewares/roles");
const { ApiError } = require("../utils/classes");
const { jwt, mail } = require("../utils/functions");

/**
 * @description Get all users.
 * @route       GET /api/auth.
 * @access      Public.
 */
const getAll = asyncHandler(async (request, response, next) => {
  const { page, limit, pagination } = request.query;
  const options = {
    page,
    limit,
    pagination,
    select: "-password",
  };
  const query = { isDeleted: false };

  if (request.query.sort === "asc") options["sort"] = "_id";
  else if (request.query.sort === "desc") options["sort"] = "-_id";

  const model = request.query.queryForAdmins ? UserAdmin : User;
  if (model == UserAdmin) options.populate = undefined;

  const users = await model.paginate(query, options);

  response
    .status(statusCodes.OK)
    .json({ success: true, data: { users }, error: null });
});

/**
 * @description Get one user.
 * @route       GET /api/auth/:userId.
 * @access      Public.
 */
const getOne = asyncHandler(async (request, response, next) => {
  const { userId } = request.params;
  const user = await User.findOne({
    _id: userId,
    role: userRole,
    isDeleted: false,
  }).select("-password");
  if (!user) {
    next(
      new ApiError(
        "User not found!",
        "RESOURCE_NOT_FOUND",
        statusCodes.NOT_FOUND
      )
    );
    return;
  }

  response
    .status(statusCodes.OK)
    .json({ success: true, data: { user }, error: null });
});

/**
 * @description Update one user.
 * @route       PUT /api/auth/:userId.
 * @access      Private.
 */
const updateOne = asyncHandler(async (request, response, next) => {
  const loggedUser = request.user;
  const { userId } = request.params;
  const { email, username, credits } = request.body;

  if (loggedUser._id != userId) {
    next(
      new ApiError(
        "User can only update self",
        "BAD_REQUEST",
        statusCodes.BAD_REQUEST
      )
    );
    return;
  }

  const user = await User.findOne({
    _id: userId,
    role: userRole,
    isDeleted: false,
  });
  if (!user) {
    next(
      new ApiError(
        "User not found!",
        "RESOURCE_NOT_FOUND",
        statusCodes.NOT_FOUND
      )
    );
    return;
  }

  const emailPayload = {};
  if (user.email !== email) {
    const userExists = (await User.countDocuments({ email: email })) > 0;
    if (userExists) {
      next(
        new ApiError(
          "User with given email exists!",
          "RESOURCE_EXISTS",
          statusCodes.BAD_REQUEST
        )
      );
      return;
    }

    emailPayload["email"] = email;
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId, role: userRole, isDeleted: false },
    {
      $set: {
        ...emailPayload,
        username,
        credits,
        lastEditBy: loggedUser._id,
        lastEditAt: new Date(Date.now()).toISOString(),
      },
    },
    {
      new: true,
    }
  ).select("-passsword");
  if (!updatedUser) {
    next(
      new ApiError(
        "Failed to update user!",
        "FAILED_UPDATE",
        statusCodes.INTERNAL_ERROR
      )
    );
    return;
  }

  response
    .status(statusCodes.OK)
    .json({ success: true, data: { user: updatedUser }, error: null });
});

/**
 * @description Upload logo of user.
 * @route       PUT /api/auth/:userId/logo.
 * @access      Private.
 */
const uploadLogo = asyncHandler(async (request, response, next) => {});

/**
 * @description Delete one user.
 * @route       DELETE /api/auth/:userId.
 * @access      Private.
 */
const deleteOne = asyncHandler(async (request, response, next) => {});

/**
 * @description Sign up a new user.
 * @route       POST /api/auth/signup.
 * @access      Public.
 */
const signup = asyncHandler(async (request, response, next) => {
  const { email, password, passwordConfirm, username, credits } = request.body;

  if (password !== passwordConfirm) {
    next(
      new ApiError(
        "Password doesn't match!",
        "SAME_PASSWORD",
        statusCodes.BAD_REQUEST
      )
    );
    return;
  }

  const userExists = (await User.countDocuments({ email })) > 0;
  const adminExists = (await UserAdmin.countDocuments({ email })) > 0;
  if (userExists || adminExists) {
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
    email,
    password: hash,
    role: userRole,
    username,
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
    data: { userId: user._id },
    error: null,
  });
});

/**
 * @description Login a new user.
 * @route       POST /api/auth/login.
 * @access      Public.
 */
const login = asyncHandler(async (request, response, next) => {
  const { email, password, remember } = request.body;

  const user = await User.findOne({
    email,
    role: userRole,
    isDeleted: false,
  }).select("_id email role password");
  const admin = await UserAdmin.findOne({
    email,
    role: Admin,
    isDeleted: false,
  }).select("_id email role password");
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

  let samePassword = null;
  if (user) samePassword = await User.comparePasswords(password, user.password);
  else if (admin)
    samePassword = await UserAdmin.comparePasswords(password, admin.password);

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

  const tokenResult = await jwt.sign({ ...tokenPayload, remember });
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

/**
 * @description Forgot password.
 * @route       POST /api/auth/forgot.
 * @access      Public.
 */
const forgot = asyncHandler(async (request, response, next) => {
  const { email, emailLanguage } = request.body;

  const user = await User.findOne({
    email,
    role: userRole,
    isDeleted: false,
  }).select(
    "_id email role password passwordResetToken passwordResetDate lastEditAt"
  );
  const admin = await UserAdmin.findOne({
    email,
    role: Admin,
    isDeleted: false,
  }).select(
    "_id email role password passwordResetToken passwordResetDate lastEditAt"
  );
  if (!user && !admin) {
    next(
      new ApiError(
        "User not found with email",
        "RESOURCE_NOT_FOUND",
        statusCodes.NOT_FOUND
      )
    );
    return;
  }

  const frontURL = process.env.FRONT_DEV_URL;

  const resetToken = crypto.randomBytes(32).toString("hex").toUpperCase();
  const resetDate = new Date(Date.now() + 1000 * 60 * 10).toISOString();

  if (user) {
    const resetQuery = Buffer.from(
      `email=${user.email}&resetToken=${resetToken}&type=user`
    ).toString("base64");
    const resetURL = `${frontURL}/resetUserPassword?q=${resetQuery}`;

    user.passwordResetToken = resetToken;
    user.passwordResetDate = resetDate;
    user.lastEditAt = new Date(Date.now()).toISOString();
    await user.save();

    const mailBody = emails.resetPassword["en"](resetURL);
    const mailOptions = {
      from: {
        name: "eBooks",
        address: process.env.FROM_EMAIL,
      },
      to: user.email,
      ...mailBody,
    };

    const mailResult = await mail(mailOptions);
    if (!mailResult.success) {
      user.passwordResetToken = null;
      user.passwordResetDate = null;
      await user.save();

      next(
        new ApiError(
          mailResult.error,
          "FAILED_MAIL",
          statusCodes.INTERNAL_ERROR
        )
      );
      return;
    }

    response.status(statusCodes.OK).json({
      success: true,
      data: { message: "Mail sent successfully!" },
      error: null,
    });
  } else if (admin) {
    const resetQuery = Buffer.from(
      `email=${admin.email}&resetToken=${resetToken}&type=admin`
    ).toString("base64");
    const resetURL = `${frontURL}/resetUserPassword?q=${resetQuery}`;

    admin.passwordResetToken = resetToken;
    admin.passwordResetDate = resetDate;
    admin.lastEditAt = new Date(Date.now()).toISOString();
    await admin.save();

    const mailBody = emails.resetPassword["en"](resetURL);
    const mailOptions = {
      from: {
        name: "eBooks",
        address: process.env.FROM_EMAIL,
      },
      to: admin.email,
      ...mailBody,
    };

    const mailResult = await mail(mailOptions);
    if (!mailResult.success) {
      admin.passwordResetToken = null;
      admin.passwordResetDate = null;
      await admin.save();

      next(
        new ApiError(
          mailResult.error,
          "FAILED_MAIL",
          statusCodes.INTERNAL_ERROR
        )
      );
      return;
    }

    response.status(statusCodes.OK).json({
      success: true,
      data: { message: "Mail sent successfully!" },
      error: null,
    });
  }
});

/**
 * @description Reset password.
 * @route       POST /api/auth/reset/:resetToken.
 * @access      Private, from email only.
 */
const reset = asyncHandler(async (request, response, next) => {
  const { resetToken } = request.params;
  const { email, newPassword, passwordConfirm } = request.body;

  if (newPassword !== passwordConfirm) {
    next(
      new ApiError(
        "Password doesnt match!",
        "SAME_PASSWORD",
        statusCodes.BAD_REQUEST
      )
    );
    return;
  }

  const user = await User.findOne({
    email,
    role: userRole,
    isDeleted: false,
    passwordResetToken: resetToken,
    passwordResetDate: { $gte: new Date(Date.now()).toISOString() },
  }).select("_id email password passwordResetToken passwordResetDate role");
  const admin = await UserAdmin.findOne({
    email,
    role: Admin,
    isDeleted: false,
    passwordResetToken: resetToken,
    passwordResetDate: { $gte: new Date(Date.now()).toISOString() },
  }).select("_id email password passwordResetToken passwordResetDate role");
  if (!user && !admin) {
    next(
      new ApiError(
        "User not found with email",
        "RESOURCE_NOT_FOUND",
        statusCodes.NOT_FOUND
      )
    );
    return;
  }

  let samePassword = null;
  if (user)
    samePassword = await User.comparePasswords(newPassword, user.password);
  else if (admin)
    samePassword = await UserAdmin.comparePasswords(
      newPassword,
      admin.password
    );

  if (samePassword) {
    next(
      new ApiError(
        "New password cant be same as old one!",
        "PASSWORD_SAME",
        statusCodes.BAD_REQUEST
      )
    );
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  let updatedUser = null;
  if (user) {
    updatedUser = await User.findOneAndUpdate(
      { _id: user._id, role: userRole, isDeleted: false },
      {
        $set: {
          password: hash,
          passwordChangedAt: new Date(Date.now()).toISOString(),
          passwordResetToken: null,
          passwordResetDate: null,
          lastEditAt: new Date(Date.now()).toISOString(),
        },
      },
      { new: true }
    );
  } else if (admin) {
    updatedUser = await UserAdmin.findOneAndUpdate(
      { _id: admin._id, role: Admin, isDeleted: false },
      {
        $set: {
          password: hash,
          passwordChangedAt: new Date(Date.now()).toISOString(),
          passwordResetToken: null,
          passwordResetDate: null,
          lastEditAt: new Date(Date.now()).toISOString(),
        },
      },
      { new: true }
    );
  }

  if (!updatedUser) {
    next(
      new ApiError(
        "Failed to update user!",
        "FAILED_USER_UPDATE",
        statusCodes.INTERNAL_ERROR
      )
    );
    return;
  }

  const jwtPayload = {
    id: updatedUser._id,
    email: updatedUser.email,
    role: updatedUser.role,
    remember: false,
  };

  const tokenResult = await jwt.sign(jwtPayload);
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

const sendContactEmail = asyncHandler(async (request, response, next) => {
  const { name, email, description } = request.body;

  const mailBody = emails.contactForm["en"](name, email, description);
  const mailOptions = {
    from: {
      name: "eBooks",
      address: process.env.FROM_EMAIL,
    },
    to: process.env.INFO_EMAIL,
    ...mailBody,
  };
  const mailResult = await mail(mailOptions);
  if (!mailResult.success) {
    next(
      new ApiError(
        "Failed to send mail!",
        "FAILED_MAIL",
        statusCodes.INTERNAL_ERROR
      )
    );
    return;
  }

  response
    .status(statusCodes.OK)
    .json({ success: true, data: {}, error: null });
});

// Exports of this file.
module.exports = {
  getAll,
  getOne,
  updateOne,
  uploadLogo,
  deleteOne,
  signup,
  login,
  forgot,
  reset,
  sendContactEmail,
};
