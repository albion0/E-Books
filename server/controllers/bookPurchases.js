// Imports: core node modules.
const path = require("path");
const fs = require("fs");

// Imports: local files.
const BookPurchase = require("../models/BookPurchase");
const User = require("../models/User");
const Book = require("../models/Book");
const asyncHandler = require("../middlewares/asyncHandler");
const { statusCodes } = require("../config");
const { ApiError } = require("../utils/classes");

/**
 * @description Get all book purchases.
 * @route       GET /api/bookpurchases.
 * @access      Public.
 */
const getAll = asyncHandler(async (request, response, next) => {
  const { page, limit, pagination } = request.query;
  const options = {
    page,
    limit,
    pagination,
    sort: "-_id",
    populate: [{ path: "user" }, { path: "book" }],
  };
  const query = { isDeleted: false, isActive: true };

  const bookPurchases = await BookPurchase.paginate(query, options);
  response
    .status(statusCodes.OK)
    .json({ success: true, data: { bookPurchases }, error: null });
});

/**
 * @description Get one Book Purchase.
 * @route       GET /api/bookpurchases/:bookPurchaseId.
 * @access      Public.
 */
const getOne = asyncHandler(async (request, response, next) => {
  const { bookPurchaseId } = request.params;

  const bookPurchase = await BookPurchase.findOne({
    _id: bookPurchaseId,
    isDeleted: false,
  })
    .populate("user")
    .populate("book");
  if (!bookPurchase) {
    next(
      new ApiError(
        "Book purchase not found with id!",
        "RESOURCE_NOT_FOUND",
        statusCodes.NOT_FOUND
      )
    );
    return;
  }

  response
    .status(statusCodes.OK)
    .json({ success: true, data: { bookPurchase }, error: null });
});

/**
 * @description Create new book purchase.
 * @route       POST /api/bookPurchases.
 * @access      Private, only roles [ADMIN].
 */
const create = asyncHandler(async (request, response, next) => {
  const { bookId, userId } = request.body;

  const book = await Book.findOne({ _id: bookId, isDeleted: false });
  if (!book) {
    next(
      new ApiError(
        "Book not found with id!",
        "RESOURCE_NOT_FOUND",
        statusCodes.NOT_FOUND
      )
    );
    return;
  }

  const user = await User.findOne({ _id: userId });
  if (!user) {
    next(
      new ApiError(
        "User not found with id!",
        "RESOURCE_NOT_FOUND",
        statusCodes.NOT_FOUND
      )
    );
    return;
  }

  if (user.credits >= +book.credits) {
    const bookExists = user.books.find((e) => e === bookId);
    if (bookExists) {
      next(
        new ApiError(
          "Book already bought!",
          "RESOURCE_NOT_FOUND",
          statusCodes.NOT_FOUND
        )
      );
      return;
    } else {
      user.credits -= book.credits;
      user.books = [...user.books, book];
      await user.save();
      const bookPurchase = await BookPurchase.create({
        user: userId,
        book: bookId,
        amount: book.credits,
      });

      response
        .status(statusCodes.OK)
        .json({ success: true, data: { bookPurchase }, error: null });
    }
  } else {
    next(
      new ApiError(
        "User doesn't have enough credits!",
        "RESOURCE_NOT_FOUND",
        statusCodes.NOT_FOUND
      )
    );
    return;
  }
});

/**
 * @description Update one book purchase.
 * @route       PUT /api/bookpurchases/:bookPurchaseId.
 * @access      Private, only roles [ADMIN].
 */
const updateOne = asyncHandler(async (request, response, next) => {});

/**
 * @description Delete one book purchase.
 * @route       DELETE /api/bookpurchases/:bookPurchaseId.
 * @access      Private, only roles [ADMIN].
 */
const deleteOne = asyncHandler(async (request, response, next) => {});

// Exports of this file.
module.exports = {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne,
};
