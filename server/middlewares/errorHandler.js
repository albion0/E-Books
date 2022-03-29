// Imports: third-party packages.
const { ValidationError } = require("express-validation");

// Imports: local files.
const { statusCodes } = require("../config");
const { ApiError } = require("../utils/classes");

// Error handling middleware that is used to prepare errors for the generic error middleware.
const errorHandler = (error, request, response, next) => {
  const err = new ApiError(
    error.message || "Internal Server Error!",
    error.statusCode || statusCodes.INTERNAL_ERROR
  );

  if (error instanceof ValidationError) {
    err.statusCode = statusCodes.BAD_REQUEST;
    err.message = Object.keys(error.details[0])
      .map((key) => error.details[0][key])
      .join(",");
  }

  next(err);
};

// Exports of this file.
module.exports = errorHandler;
