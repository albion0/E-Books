// Imports: third-party packages.
const { Joi } = require("express-validation");

// Object that holds validation for all controllers methods inside Books controller.
const validator = {
  getAllReviews: {
    query: Joi.object({
      page: Joi.number().optional().default(1),
      limit: Joi.number().optional().default(10),
      pagination: Joi.boolean().optional().default(true),
    }),
  },
};

// Exports of this file.
module.exports = validator;
