// Imports: local files.
const { statusCodes } = require("../config");

// Generic error handling middleware used in our API.
const genericErrorHandler = (error, request, response, next) => {
  const payload = {
    success: false,
    error: error.message || "Internal Server Error!",
    data: null,
  };

  return response
    .status(error.statusCode || statusCodes.INTERNAL_ERROR)
    .json(payload);
};

// Exports of this file.
module.exports = genericErrorHandler;
