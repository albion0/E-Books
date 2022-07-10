// Imports: third-party packages.
const { Joi } = require("express-validation");

// Object that holds validation for all controllers methods inside Reports controller.
const validator = {
  validateCounts: {
    body: Joi.object({
      startDate: Joi.date().optional().default(null),
      endDate: Joi.date().optional().default(null),
    }),
  },
};

// Exports of this file.
module.exports = validator;
