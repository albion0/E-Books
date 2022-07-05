// Imports: core node modules.
const path = require("path");
const fs = require("fs");

// Imports: local files.
const Book = require("../models/Book");
const User = require("../models/User");
const Author = require("../models/Author");
const asyncHandler = require("../middlewares/asyncHandler");
const { statusCodes } = require("../config");
const { ApiError } = require("../utils/classes");

/**
 * @description Get all books.
 * @route       GET /api/books.
 * @access      Public.
 */
const getAll = asyncHandler(async (request, response, next) => {
  const { page, limit, pagination } = request.query;
  const options = {
    page,
    limit,
    pagination,
    sort: "-_id",
    populate: [{ path: "authors" }, { path: "genres" }],
  };
  const query = { isDeleted: false, isActive: true };

  const books = await Book.paginate(query, options);
  response
    .status(statusCodes.OK)
    .json({ success: true, data: { books }, error: null });
});

/**
 * @description Get one Book.
 * @route       GET /api/books/:bookId.
 * @access      Public.
 */
const getOne = asyncHandler(async (request, response, next) => {
  const { bookId } = request.params;

  const book = await Book.findOne({ _id: bookId, isDeleted: false })
    .populate("authors")
    .populate("genres");
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

  response
    .status(statusCodes.OK)
    .json({ success: true, data: { book }, error: null });
});

/**
 * @description Create new book.
 * @route       POST /api/books.
 * @access      Private, only roles [ADMIN].
 */
const create = asyncHandler(async (request, response, next) => {
  const user = request.user;
  const { title, content, credits, authors, genres } = request.body;

  const book = await Book.create({
    title,
    content,
    credits,
    authors,
    genres,
    createdBy: user._id,
  });
  if (!book) {
    next(
      new ApiError(
        "Failed to create book!",
        "FAILED_CREATE",
        statusCodes.INTERNAL_ERROR
      )
    );
    return;
  }

  for (const author of authors) {
    const authorOfBook = await Author.findOne({ _id: author });
    if (!authorOfBook) {
      next(
        new ApiError("Author not found!", "NOT_FOUND", statusCodes.NOT_FOUND)
      );
    }
    authorOfBook.books = [...authorOfBook.books, book._id];
    await authorOfBook.save();
  }

  response
    .status(statusCodes.CREATED)
    .json({ success: true, data: { book }, error: null });
});

/**
 * @description Upload photo of book.
 * @route       PUT /api/books/:bookId/photo.
 * @access      Private.
 */
const uploadPhoto = asyncHandler(async (request, response, next) => {
  if (!request.files || Object.keys(request.files).length === 0) {
    next(
      new ApiError(
        "File must be uploaded",
        "MISSING_FILE",
        statusCodes.BAD_REQUEST
      )
    );
    return;
  }

  const inputName = "bookPhoto";
  const file = request.files[inputName];
  if (!file) {
    next(
      new ApiError(
        `Input name must be ${inputName}!`,
        "WRONG_INPUT_NAME",
        statusCodes.BAD_REQUEST
      )
    );
    return;
  }

  const { data, mimetype } = file;

  const type = mimetype.split("/").pop();
  const allowedTypes = ["jpeg", "jpg", "png"];
  if (!allowedTypes.includes(type)) {
    next(
      new ApiError(
        `Only ${allowedTypes.toString()} file types are allowed!`,
        "WRONG_TYPE",
        statusCodes.BAD_REQUEST
      )
    );
    return;
  }

  const { bookId } = request.params;
  const book = await Book.findOne({
    _id: bookId,
    isDeleted: false,
  });
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

  const fileName = `${book._id}_${book.title.replace(
    /\s/g,
    ""
  )}_${Date.now()}.${type}`;
  const filePath = path.join(__dirname, `../public/books/${fileName}`);
  fs.writeFile(filePath, data, { encoding: "utf-8" }, async (error) => {
    if (error) {
      next(
        new ApiError(
          "Failed to upload file",
          "FAILED_UPLOAD",
          statusCodes.INTERNAL_ERROR
        )
      );
      return;
    }

    const publicURL = process.env.PUBLIC_DEV_URL;
    const fileURL = `${publicURL}/books/${fileName}`;

    book.bookPhoto = fileURL;
    book.lastEditAt = new Date(Date.now()).toISOString();
    await book.save();

    const tempBook = await Book.findOne({ _id: book._id, isDeleted: false });

    response
      .status(statusCodes.OK)
      .json({ success: true, data: { book: tempBook }, error: null });
  });
});

/**
 * @description Update one book.
 * @route       PUT /api/books/:bookId.
 * @access      Private, only roles [ADMIN].
 */
const updateOne = asyncHandler(async (request, response, next) => {
  const user = request.user;
  const { title, content, credits, authors, genres } = request.body;
  const { bookId } = request.params;

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

  const updatedBook = await Book.findOneAndUpdate(
    { _id: bookId, isDeleted: false },
    {
      $set: {
        title,
        content,
        credits,
        authors,
        genres,
        lastEditBy: user._id,
        lastEditAt: new Date(Date.now()).toISOString(),
      },
    },
    { new: true }
  );
  if (!updatedBook) {
    next(
      new ApiError(
        "Failed to update Book!",
        "FAILED_UPDATE",
        statusCodes.INTERNAL_ERROR
      )
    );
    return;
  }

  response
    .status(statusCodes.CREATED)
    .json({ success: true, data: { book: updatedBook }, error: null });
});

/**
 * @description Delete one book.
 * @route       DELETE /api/books/:bookId.
 * @access      Private, only roles [ADMIN].
 */
const deleteOne = asyncHandler(async (request, response, next) => {
  const user = request.user;
  const { bookId } = request.params;

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

  const deletedBook = await Book.findOneAndUpdate(
    { _id: bookId, isDeleted: false },
    {
      $set: {
        isDeleted: true,
        lastEditBy: user._id,
        lastEditAt: new Date(Date.now()).toISOString(),
      },
    },
    { new: true }
  );
  if (!deletedBook) {
    next(
      new ApiError(
        "Failed to delete Book!",
        "FAILED_DELETE",
        statusCodes.INTERNAL_ERROR
      )
    );
    return;
  }

  response
    .status(statusCodes.OK)
    .json({ success: true, data: { book: deletedBook }, error: null });
});

/**
 * @description Buy a book.
 * @route       POST /api/books/:bookId/:userId.
 * @access      Public
 */
const buyBook = asyncHandler(async(request, response, next) => {
  const { bookId, userId } = request.params;
  console.log('HELLOOO ', userId, bookId);

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

  if(user.credits >= +book.credits) {
    user.credits -= book.credits;
    console.log(user);
    user.books = [...user.books, book];
    await user.save();
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

  response.status(statusCodes.OK).json({ success: true });
})

const userBooks = asyncHandler(async(request, response, next) => {
  const { userId, page, limit } = request.params;
  console.log(`page ${page} limit ${limit} userId ${userId}`)
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

  const populatedBooks = await User.find().populate("books").exec();

  response
    .status(statusCodes.OK)
    .json({ success: true, data: { book: populatedBooks }, error: null });
})

// Exports of this file.
module.exports = { getAll, getOne, create, uploadPhoto, updateOne, deleteOne, buyBook, userBooks };
