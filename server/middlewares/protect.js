// Imports: local files
const { statusCodes } = require("../config");
const { ApiError } = require("../utils/classes");

// Middleware that is used to protect routes from roles in our API.
const protect = (...roles) => {
  return (request, response, next) => {
    const user = request.user;
    if (!user) {
      next(new ApiError("Forbidden!", "FORBIDDEN_ROLE", statusCodes.FORBIDDEN));
      return;
    }

    if (!roles.includes(user.role)) {
      next(new ApiError("Forbidden!", "FORBIDDEN_ROLE", statusCodes.FORBIDDEN));
      return;
    }

    next();
  };
};

// Exports of this file.
module.exports = protect;
