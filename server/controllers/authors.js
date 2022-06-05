// Imports: local files.
const Author = require("../models/Author");
const asyncHandler = require("../middlewares/asyncHandler");
const { statusCodes } = require("../config");
const { ApiError } = require("../utils/classes");

/**
 * @description Get all authors.
 * @route       GET /api/authors.
 * @access      Public.
 */
const getAll = asyncHandler(async (request, response, next) => {
  const { page, limit, pagination } = request.query;
  const options = { page, limit, pagination, sort: "-_id" };
  const query = { isDeleted: false, isActive: true };

  const authors = await Author.paginate(query, options);
  response
    .status(statusCodes.OK)
    .json({ success: true, data: { authors }, error: null });
});

/**
 * @description Get one Author.
 * @route       GET /api/authors/:authorId.
 * @access      Public.
 */
const getOne = asyncHandler(async (request, response, next) => {
  const { authorId } = request.params;

  const author = await Author.findOne({ _id: authorId, isDeleted: false });
  if (!author) {
    next(
      new ApiError(
        "Author not found with id!",
        "RESOURCE_NOT_FOUND",
        statusCodes.NOT_FOUND
      )
    );
    return;
  }

  response
    .status(statusCodes.OK)
    .json({ success: true, data: { author }, error: null });
});

/**
 * @description Create new author.
 * @route       POST /api/authors.
 * @access      Private, only roles [ADMIN].
 */
const create = asyncHandler(async (request, response, next) => {
  const user = request.user;
  const { name, description } = request.body;

  const author = await Author.create({
    name,
    description,
    createdBy: user._id,
  });
  if (!author) {
    next(
      new ApiError(
        "Failed to create author!",
        "FAILED_CREATE",
        statusCodes.INTERNAL_ERROR
      )
    );
    return;
  }

  response
    .status(statusCodes.CREATED)
    .json({ success: true, data: { author }, error: null });
});

/**
 * @description Update one author.
 * @route       PUT /api/authors/:authorId.
 * @access      Private, only roles [ADMIN].
 */
const updateOne = asyncHandler(async (request, response, next) => {
  const user = request.user;
  const { name, description } = request.body;
  const { authorId } = request.params;

  const author = await Author.findOne({ _id: authorId, isDeleted: false });
  if (!author) {
    next(
      new ApiError(
        "Author not found with id!",
        "RESOURCE_NOT_FOUND",
        statusCodes.NOT_FOUND
      )
    );
    return;
  }

  const updatedAuthor = await Author.findOneAndUpdate(
    { _id: authorId, isDeleted: false },
    {
      $set: {
        name,
        description,
        lastEditBy: user._id,
        lastEditAt: new Date(Date.now()).toISOString(),
      },
    },
    { new: true }
  );
  if (!updatedAuthor) {
    next(
      new ApiError(
        "Failed to update Author!",
        "FAILED_UPDATE",
        statusCodes.INTERNAL_ERROR
      )
    );
    return;
  }

  response
    .status(statusCodes.CREATED)
    .json({ success: true, data: { author: updatedAuthor }, error: null });
});

/**
 * @description Delete one author.
 * @route       DELETE /api/authors/:authorId.
 * @access      Private, only roles [ADMIN].
 */
const deleteOne = asyncHandler(async (request, response, next) => {
  const user = request.user;
  const { authorId } = request.params;

  const author = await Author.findOne({ _id: authorId, isDeleted: false });
  if (!author) {
    next(
      new ApiError(
        "Author not found with id!",
        "RESOURCE_NOT_FOUND",
        statusCodes.NOT_FOUND
      )
    );
    return;
  }

  const deletedAuthor = await Author.findOneAndUpdate(
    { _id: authorId, isDeleted: false },
    {
      $set: {
        isDeleted: true,
        lastEditBy: user._id,
        lastEditAt: new Date(Date.now()).toISOString(),
      },
    },
    { new: true }
  );
  if (!deletedAuthor) {
    next(
      new ApiError(
        "Failed to delete author!",
        "FAILED_DELETE",
        statusCodes.INTERNAL_ERROR
      )
    );
    return;
  }

  response
    .status(statusCodes.OK)
    .json({ success: true, data: { author: deletedAuthor }, error: null });
});

// Exports of this file.
module.exports = { getAll, getOne, create, updateOne, deleteOne };
