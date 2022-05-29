// Imports: third-party packages.
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");
const bcrypt = require("bcryptjs");

// User Schema that is used to represent single User in our API.
const UserAdminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
    default: null,
  },
  lastName: {
    type: String,
    required: false,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
    enum: ["admin", "business", "mentor"],
  },
  hasPasswordChanged: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
    default: null,
  },
  lastEditAt: {
    type: Date,
    required: false,
    default: null,
  },
  lastEditBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
    default: null,
  },
});

// Static & instance methods.
UserSchema.statics.comparePasswords = async (
  candidatePassword,
  hashedPassword
) => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

UserSchema.statics.passwordChangedAfter = (
  passwordChangedAt,
  tokenIssuedAt
) => {
  if (!passwordChangedAt || !tokenIssuedAt) return false;

  return new Date(passwordChangedAt) > new Date(tokenIssuedAt);
};

// Plugins.
UserAdminSchema.plugin(mongoosePaginate);
UserAdminSchema.plugin(mongooseAggregatePaginate);

// Exports of this file.
module.exports = mongoose.model("UserAdmin", UserAdminSchema);
