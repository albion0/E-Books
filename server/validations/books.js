// Imports: third-party packages.
const { Joi } = require("express-validation");

// Object that holds validation for all controllers methods inside Books controller.
const validator = {
  getAllBooks: {
    query: Joi.object({
      page: Joi.number().optional().default(1),
      limit: Joi.number().optional().default(10),
      pagination: Joi.boolean().optional().default(true),
    }),
  },
  createBook: {
    body: Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      authors: Joi.array()
        .required()
        .items(
          Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
        ),
      genres: Joi.array()
        .required()
        .items(
          Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
        ),
      credits: Joi.string().required(),
    }),
  },
  updateBook: {
    params: Joi.object({
      bookId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    body: Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      authors: Joi.array()
        .required()
        .items(
          Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
        ),
      genres: Joi.array()
        .required()
        .items(
          Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
        ),
      credits: Joi.string().required(),
    }),
  },
  validateBookId: {
    params: Joi.object({
      bookId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};

// Exports of this file.
module.exports = validator;
