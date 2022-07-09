// Imports: third-party packages.
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");

// Book Purchase Schema that is used to represent single Book Purchase in our API.
const BookPurchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
    default: null,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: false,
    default: null,
  },
  amount: {
    type: String,
    required: false,
    default: null,
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
BookPurchaseSchema.plugin(mongoosePaginate);
BookPurchaseSchema.plugin(mongooseAggregatePaginate);

// Exports of this file.
module.exports = mongoose.model("BookPurchase", BookPurchaseSchema);
