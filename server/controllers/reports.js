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
const UserAdmin = require("../models/UserAdmin");
const db = require("../utils/functions/sequelize");
const { Op } = require("sequelize");

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
          [Op.gte]: new Date(startDate),
        },
      },
    };
  else if (!startDate && endDate)
    mysqlquery = {
      where: {
        createdAt: { [Op.lte]: new Date(endDate) },
      },
    };
  else if (startDate && endDate)
    mysqlquery = {
      where: {
        createdAt: {
          [Op.gte]: new Date(startDate),
          [Op.lte]: new Date(endDate),
        },
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

const getBooks = asyncHandler(async (request, response, next) => {
  const { startDate, endDate, type } = request.body;

  let query = {};

  if (startDate && !endDate)
    query = {
      isActive: true,
      isDeleted: false,
      createdAt: { $gte: new Date(startDate) },
    };
  else if (!startDate && endDate)
    query = {
      isActive: true,
      isDeleted: false,
      createdAt: { $lte: new Date(endDate) },
    };
  else if (startDate && endDate)
    query = {
      isActive: true,
      isDeleted: false,
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    };
  else query = {};

  if (type === "BY_AUTHORS") {
    const authors = await Author.find({
      isActive: true,
      isDeleted: false,
    }).select("_id name");
    const responseArr = [];

    for (const author of authors) {
      const count = await Book.countDocuments({
        authors: { $in: [author._id] },
        ...query,
      });
      responseArr.push([author.name, count]);
    }

    response
      .status(statusCodes.OK)
      .json({ success: true, data: { books: responseArr } });
    return;
  } else if (type === "BY_GENRES") {
    const genres = await Genre.find({
      isActive: true,
      isDeleted: false,
    }).select("_id name");
    const responseArr = [];

    for (const genre of genres) {
      const count = await Book.countDocuments({
        genres: { $in: [genre._id] },
        ...query,
      });
      responseArr.push([genre.name, count]);
    }

    response
      .status(statusCodes.OK)
      .json({ success: true, data: { books: responseArr } });
    return;
  } else {
    next(
      new ApiError("Wrong filter type", "WRONG_TYPE", statusCodes.BAD_REQUEST)
    );
    return;
  }
});

const getPayments = asyncHandler(async (request, response, next) => {
  const { startDate, endDate, type } = request.body;

  let query = {};

  if (startDate && !endDate)
    query = {
      isActive: true,
      isDeleted: false,
      createdAt: { $gte: new Date(startDate) },
    };
  else if (!startDate && endDate)
    query = {
      isActive: true,
      isDeleted: false,
      createdAt: { $lte: new Date(endDate) },
    };
  else if (startDate && endDate)
    query = {
      isActive: true,
      isDeleted: false,
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    };
  else query = {};

  if (type === "BY_READERS") {
    const users = await User.find({
      isActive: true,
      isDeleted: false,
    }).select("_id username");
    const responseArr = [];

    for (const user of users) {
      const count = await Payment.countDocuments({
        user: { $in: [user._id] },
        ...query,
      });
      responseArr.push([user.username, count]);
    }

    response
      .status(statusCodes.OK)
      .json({ success: true, data: { payments: responseArr } });
    return;
  } else {
    next(
      new ApiError("Wrong filter type", "WRONG_TYPE", statusCodes.BAD_REQUEST)
    );
    return;
  }
});

// Exports of this file.
module.exports = { getCounts, getBooks, getPayments };
