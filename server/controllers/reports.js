const asyncHandler = require("../middlewares/asyncHandler");
const { statusCodes } = require("../config");
const { ApiError } = require("../utils/classes");
const Author = require("../models/Author");
const Genre = require("../models/Genre");
const Book = require("../models/Book");
const User = require("../models/User");
const BookPurchase = require("../models/BookPurchase");
const Payment = require("../models/Payment");
const Review = require("../models/Review");
const ForumTopic = require("../models/ForumTopic");
const ForumComment = require("../models/ForumComment");
const UserAdmin = require("../models/UserAdmin");
const db = require("../utils/functions/sequelize");

/**
 * @description Get count reports for different models.
 * @route       POST /api/reports/counts.
 * @access      Public.
 */

const getCounts = asyncHandler(async (request, response, next) => {
  const { startDate, endDate } = request.body;

  let query = {};

  if (startDate && !endDate)
    query = { createdAt: { $gte: new Date(startDate) } };
  else if (!startDate && endDate)
    query = { createdAt: { $lte: new Date(endDate) } };
  else if (startDate && endDate)
    query = {
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    };
  else query = {};

  let mysqlquery = {};

  if (startDate && !endDate)
    mysqlquery = {
      where: {
        createdAt: {
          $gte: new Date(startDate),
        },
      },
    };
  else if (!startDate && endDate)
    mysqlquery = {
      where: {
        createdAt: { $lte: new Date(endDate) },
      },
    };
  else if (startDate && endDate)
    mysqlquery = {
      where: {
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    };
  else mysqlquery = {};

  const bookCount = await Book.countDocuments(query);
  const authorCount = await Author.countDocuments(query);
  const genreCount = await Genre.countDocuments(query);
  const userCount = await User.countDocuments(query);
  const adminCount = await UserAdmin.countDocuments(query);
  const paymentCount = await Payment.countDocuments(query);
  const bookPurchaseCount = await BookPurchase.countDocuments(query);
  const reviewCount = await Review.countDocuments(query);
  const forumTopicCount = await db.ForumTopic.count(mysqlquery);
  const forumCommentCount = await db.ForumComment.count(mysqlquery);

  const counts = {
    bookCount,
    authorCount,
    genreCount,
    userCount,
    adminCount,
    paymentCount,
    bookPurchaseCount,
    reviewCount,
    forumTopicCount,
    forumCommentCount,
  };
  response.status(statusCodes.OK).json({ success: true, data: { counts } });
});

// Exports of this file.
module.exports = { getCounts };
