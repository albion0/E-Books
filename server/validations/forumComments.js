// Imports: third-party packages.
const { Joi } = require("express-validation");

// Object that holds validation for all controllers methods inside Business Type controller.
const validator = {
  createForumComment: {
    body: Joi.object({
      text: Joi.string().required(),
    }),
  },
  updateForumComment: {
    params: Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    body: Joi.object({
      text: Joi.string().required(),
    }),
  },
  validateForumCommentId: {
    params: Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};

// Exports of this file.
module.exports = validator;
