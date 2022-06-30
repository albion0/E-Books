// Imports: third-party packages.
const { Joi } = require("express-validation");

// Object that holds validation for all controllers methods inside Author controller.
const validator = {
  getAllAuthors: {
    query: Joi.object({
      page: Joi.number().optional().default(1),
      limit: Joi.number().optional().default(10),
      pagination: Joi.boolean().optional().default(true),
    }),
  },
  createAuthor: {
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    }),
  },
  updateAuthor: {
    params: Joi.object({
      authorId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    }),
  },
  validateAuthorId: {
    params: Joi.object({
      authorId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};

// Exports of this file.
module.exports = validator;
