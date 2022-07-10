// Imports: third-party packages.
const { Joi } = require("express-validation");

// Object that holds validation for all controllers methods inside Genres controller.
const validator = {
  getAllGenres: {
    query: Joi.object({
      page: Joi.number().optional().default(1),
      limit: Joi.number().optional().default(10),
      pagination: Joi.boolean().optional().default(true),
      genreName: Joi.string().optional(),
    }),
  },
  createGenre: {
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    }),
  },
  updateGenre: {
    params: Joi.object({
      genreId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    }),
  },
  validateGenreId: {
    params: Joi.object({
      genreId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};

// Exports of this file.
module.exports = validator;
