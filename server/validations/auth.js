// Imports: third-party packages.
const { Joi } = require("express-validation");

// Object that holds validation for all controllers methods inside Auth controller.
const validator = {
  getAllUsers: {
    query: Joi.object({
      page: Joi.number().optional().default(1),
      limit: Joi.number().optional().default(10),
      pagination: Joi.boolean().optional().default(true),
      sort: Joi.string().optional().default(null).allow("asc", "desc", null),
      queryForAdmins: Joi.boolean()
        .optional()
        .default(null)
        .allow(true, false, null),
    }),
  },
  updateUser: {
    params: Joi.object({
      userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    body: Joi.object({
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      credits: Joi.string().required(),
    }),
  },
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
      remember: Joi.boolean().optional().default(false),
    }),
  },
  forgotPassword: {
    body: Joi.object({
      email: Joi.string().email().required(),
    }),
  },
  resetPassword: {
    params: Joi.object({
      resetToken: Joi.string().required(),
    }),
    body: Joi.object({
      email: Joi.string().email().required(),
      newPassword: Joi.string().min(8).required(),
      passwordConfirm: Joi.string().min(8).required(),
    }),
  },
};

// Exports of this file.
module.exports = validator;
