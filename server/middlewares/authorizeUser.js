// Imports: local files.
const User = require("../models/User");
const UserAdmin = require("../models/UserAdmin");
const { Admin: adminRole, User: userRole } = require("./roles");
const asyncHandler = require("./asyncHandler");
const { statusCodes } = require("../config");
const { ApiError } = require("../utils/classes");
const { jwt } = require("../utils/functions");

// Middleware that is used to authorize users in our API.
const authorize = asyncHandler(async (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    next(
      new ApiError(
        "Unauthorized!",
        "MISSING_AUTH_HEADER",
        statusCodes.UNAUTHORIZED
      )
    );
    return;
  }

  const [bearer, token] = authorization.split(" ");
  if (!bearer || bearer !== "Bearer" || !token) {
    next(
      new ApiError(
        "Unauthorized!",
        "WRONG_AUTH_HEADER",
        statusCodes.UNAUTHORIZED
      )
    );
    return;
  }

  const tokenResult = await jwt.decode(token);
  if (!tokenResult.success) {
    next(
      new ApiError(
        tokenResult.error,
        "FAILED_DECODE_TOKEN",
        statusCodes.UNAUTHORIZED
      )
    );
    return;
  }

  const { decoded } = tokenResult.data;
  let user = null;
  switch (decoded.role) {
    case "admin":
      user = await UserAdmin.findOne({
        _id: decoded.id,
        role: adminRole,
        isDeleted: false,
      });
      break;
    case "user":
      user = await User.findOne({
        _id: decoded.id,
        role: userRole,
        isDeleted: false,
      });
      break;
    default:
      user = null;
      break;
  }
  if (!user) {
    next(
      new ApiError(
        "User not found!",
        "RESOURCE_NOT_FOUND",
        statusCodes.UNAUTHORIZED
      )
    );
    return;
  }

  const iat = new Date(0);
  iat.setUTCMilliseconds(decoded.iat * 1000);

  const passwordChanged = User.passwordChangedAfter(
    user.passwordChangedAt,
    iat
  );
  if (passwordChanged) {
    next(
      new ApiError(
        "Password already changed!",
        "PASSWORD_CHANGED",
        statusCodes.UNAUTHORIZED
      )
    );
    return;
  }

  request.user = user;
  next();
});

// Exports of this file.
module.exports = authorize;
