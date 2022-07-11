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
  validateBooks: {
    body: Joi.object({
      startDate: Joi.date().optional().default(null),
      endDate: Joi.date().optional().default(null),
      type: Joi.string()
        .optional()
        .default(null)
        .allow("BY_AUTHORS", "BY_GENRES"),
    }),
  },
  validatePayments: {
    body: Joi.object({
      startDate: Joi.date().optional().default(null),
      endDate: Joi.date().optional().default(null),
      type: Joi.string().optional().default(null).allow("BY_READERS"),
    }),
  },
  validateBookPurchases: {
    body: Joi.object({
      startDate: Joi.date().optional().default(null),
      endDate: Joi.date().optional().default(null),
      type: Joi.string()
        .optional()
        .default(null)
        .allow("BY_READERS", "BY_BOOKS"),
    }),
  },
  validateReviews: {
    body: Joi.object({
      startDate: Joi.date().optional().default(null),
      endDate: Joi.date().optional().default(null),
      type: Joi.string()
        .optional()
        .default(null)
        .allow("BY_READERS", "BY_BOOKS"),
    }),
  },
  validateForum: {
    body: Joi.object({
      startDate: Joi.date().optional().default(null),
      endDate: Joi.date().optional().default(null),
      type: Joi.string()
        .optional()
        .default(null)
        .allow("FORUM_TOPICS", "FORUM_COMMENTS"),
    }),
  },
};

// Exports of this file.
module.exports = validator;
