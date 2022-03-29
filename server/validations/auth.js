// Imports: third-party packages.
const { Joi } = require("express-validation");

// Object that holds validation for all controllers methods inside Auth controller.
const validator = {
  validateUserId: {
    params: Joi.object({
      userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
  signupUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      passwordConfirm: Joi.string().min(8).required(),
      username: Joi.string().required(),
      credits: Joi.string().required(),
    }),
  },
  loginUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  },
};

// Exports of this file.
module.exports = validator;
