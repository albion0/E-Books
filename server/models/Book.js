// Imports: third-party packages.
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");

// Book Schema that is used to represent single Book in our API.
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  credits: {
    type: String,
    required: true,
  },
  bookPhoto: {
    type: String,
    required: false,
    default: null,
  },
  authors: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
    required: false,
    default: [],
  },
  genres: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
    required: false,
    default: [],
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

// PLugins.
BookSchema.plugin(mongoosePaginate);
BookSchema.plugin(mongooseAggregatePaginate);

// Exports of this file.
module.exports = mongoose.model("Book", BookSchema);
