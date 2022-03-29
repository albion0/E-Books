// Imports: third-party packages.
const mongoose = require("mongoose");

// User Schema that is inherited from other user types in our API.
const Base = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordResetToken: {
    type: String,
    required: false,
    default: null,
  },
  passwordResetDate: {
    type: Date,
    required: false,
    default: null,
  },
  passwordChangedAt: {
    type: Date,
    required: false,
    default: null,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: false,
    default: null,
  },
  lastEditAt: {
    type: Date,
    required: false,
    default: null,
  },
  lastEditBy: {
    type: String,
    required: false,
    default: null,
  },
});

// Exports of this file.
module.exports = Base.obj;
