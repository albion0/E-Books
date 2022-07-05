// Imports: third-party packages.
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");
const bcrypt = require("bcryptjs");

// Imports: local files.
const Base = require("./Base");

// User Schema that is used to represent single User in our API.
const UserSchema = new mongoose.Schema({
  ...Base,
  username: {
    type: String,
    required: false,
    default: null,
  },
  credits: {
    type: String,
    required: false,
    default: null,
  },
  books: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    required: false,
    default: [],
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
UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(mongooseAggregatePaginate);

// Exports of this file.
module.exports = mongoose.model("User", UserSchema);
