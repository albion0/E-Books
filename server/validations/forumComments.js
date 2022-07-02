// Imports: third-party packages.
const { Joi } = require("express-validation");

// Object that holds validation for all controllers methods inside Forum Comments controller.
const validator = {
  topicComments: {
    query: Joi.object({
      id: Joi.number().optional(),
    }),
  },
  createForumComment: {
    body: Joi.object({
      text: Joi.string().required(),
      ForumTopicId: Joi.number().optional(),
    }),
  },
  updateForumComment: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      text: Joi.string().required(),
    }),
  },
  validateForumCommentId: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
};

// Exports of this file.
module.exports = validator;
