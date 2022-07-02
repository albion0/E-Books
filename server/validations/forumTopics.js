// Imports: third-party packages.
const { Joi } = require("express-validation");

// Object that holds validation for all controllers methods inside Forum Topics controller.
const validator = {
  createForumTopic: {
    body: Joi.object({
      topic: Joi.string().required(),
      content: Joi.string().required(),
    }),
  },
  updateForumTopic: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      topic: Joi.string().required(),
      content: Joi.string().required(),
    }),
  },
  validateForumTopicId: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
};

// Exports of this file.
module.exports = validator;
