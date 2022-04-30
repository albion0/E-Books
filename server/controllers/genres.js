// Imports: local files.
const Genre = require('../models/Genre');
const asyncHandler = require('../middlewares/asyncHandler');
const { statusCodes } = require('../config');
const { ApiError } = require('../utils/classes');

/**
 * @description Get all genres.
 * @route       GET /api/genres.
 * @access      Public.
 */
const getAll = asyncHandler(async (request, response, next) => {
  const { page, limit, pagination } = request.query;
  const options = { page, limit, pagination, sort: '-_id' };
  const query = { isDeleted: false, isActive: true };

  const genres = await Genre.paginate(query, options);
  response.status(statusCodes.OK).json({ success: true, data: { genres }, error: null });
});

/**
 * @description Get one genre.
 * @route       GET /api/genres/:genreId.
 * @access      Public.
 */
const getOne = asyncHandler(async (request, response, next) => {
  const { genreId } = request.params;

  const genre = await Genre.findOne({ _id: genreId, isDeleted: false });
  if (!genre) {
    next(new ApiError('Genre not found with id!', 'RESOURCE_NOT_FOUND', statusCodes.NOT_FOUND));
    return;
  }

  response.status(statusCodes.OK).json({ success: true, data: { genre }, error: null });
});

/**
 * @description Create new genre.
 * @route       POST /api/genres.
 * @access      Private, only roles [ADMIN].
 */
const create = asyncHandler(async (request, response, next) => {
  const user = request.user;
  const { name, description } = request.body;

  const genreExists =
    (await Genre.countDocuments({
      $or: { 'name': name },
      isDeleted: false,
    })) > 0;
  if (genreExists) {
    next(new ApiError('Genre with name exists!', 'GENRE_EXISTS', statusCodes.BAD_REQUEST));
    return;
  }

  const genre = await Genre.create({
    name,
    description,
    createdBy: user._id,
  });
  if (!genre) {
    next(new ApiError('Failed to create genre!', 'FAILED_CREATE', statusCodes.INTERNAL_ERROR));
    return;
  }

  response.status(statusCodes.CREATED).json({ success: true, data: { genre }, error: null });
});

/**
 * @description Update one genre.
 * @route       PUT /api/genres/:genreId.
 * @access      Private, only roles [ADMIN].
 */
const updateOne = asyncHandler(async (request, response, next) => {
  const user = request.user;
  const { name, description } = request.body;
  const { genreId } = request.params;

  const genreExists =
    (await Genre.countDocuments({
      _id: { $ne: genreId },
      $or: { 'name': name },
      isDeleted: false,
    })) > 0;
  if (genreExists) {
    next(new ApiError('Genre with name exists!', 'GENRE_EXISTS', statusCodes.BAD_REQUEST));
    return;
  }

  const genre = await Genre.findOne({ _id: genreId, isDeleted: false });
  if (!genre) {
    next(new ApiError('Organisation Type not found with id!', 'RESOURCE_NOT_FOUND', statusCodes.NOT_FOUND));
    return;
  }

  const updatedGenre = await Genre.findOneAndUpdate(
    { _id: businessTypeId, isDeleted: false },
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
  if (!updatedGenre) {
    next(new ApiError('Failed to update genre!', 'FAILED_UPDATE', statusCodes.INTERNAL_ERROR));
    return;
  }

  response
    .status(statusCodes.CREATED)
    .json({ success: true, data: { genre: updatedGenre }, error: null });
});

/**
 * @description Delete one genre.
 * @route       DELETE /api/genres/:genreId.
 * @access      Private, only roles [ADMIN].
 */
const deleteOne = asyncHandler(async (request, response, next) => {
  const user = request.user;
  const { genreId } = request.params;

  const genre = await Genre.findOne({ _id: genreId, isDeleted: false });
  if (!genre) {
    next(new ApiError('Genre not found with id!', 'RESOURCE_NOT_FOUND', statusCodes.NOT_FOUND));
    return;
  }

  const deletedGenre = await Genre.findOneAndUpdate(
    { _id: genreId, isDeleted: false },
    {
      $set: {
        isDeleted: true,
        lastEditBy: user._id,
        lastEditAt: new Date(Date.now()).toISOString(),
      },
    },
    { new: true }
  );
  if (!deletedGenre) {
    next(new ApiError('Failed to delete organisation type!', 'FAILED_DELETE', statusCodes.INTERNAL_ERROR));
    return;
  }

  response.status(statusCodes.OK).json({ success: true, data: { businesstype: deletedGenre }, error: null });
});

// Exports of this file.
module.exports = { getAll, getOne, create, updateOne, deleteOne };
