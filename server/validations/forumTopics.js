// Imports: third-party packages.
const { Joi } = require("express-validation");

// Object that holds validation for all controllers methods inside Business Type controller.
const validator = {
  createForumTopic: {
    body: Joi.object({
      topic: Joi.string().required(),
      content: Joi.string().required(),
    }),
  },
  updateForumTopic: {
    params: Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    body: Joi.object({
      topic: Joi.string().required(),
      content: Joi.string().required(),
    }),
  },
  validateForumTopicId: {
    params: Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};

// Exports of this file.
module.exports = validator;
