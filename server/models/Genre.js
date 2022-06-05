// Imports: third-party packages.
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");

// Genre Schema that is used to represent single Genre in our API.
const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
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
    ref: "UserAdmin",
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
    ref: "UserAdmin",
    required: false,
    default: null,
  },
});

// PLugins.
GenreSchema.plugin(mongoosePaginate);
GenreSchema.plugin(mongooseAggregatePaginate);

// Exports of this file.
module.exports = mongoose.model("Genre", GenreSchema);
