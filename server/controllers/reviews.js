// Imports: core node modules.
const path = require("path");
const fs = require("fs");

// Imports: local files.
const Review = require("../models/Review");
const asyncHandler = require("../middlewares/asyncHandler");
const { statusCodes } = require("../config");
const { ApiError } = require("../utils/classes");

/**
 * @description Get all reviews.
 * @route       GET /api/reviews.
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

  const reviews = await Review.paginate(query, options);
  response
    .status(statusCodes.OK)
    .json({ success: true, data: { reviews }, error: null });
});

// Exports of this file.
module.exports = {
  getAll,
};
