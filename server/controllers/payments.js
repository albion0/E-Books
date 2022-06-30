// Imports: local files.
const Payment = require("../models/Payment");
const asyncHandler = require("../middlewares/asyncHandler");
const { statusCodes } = require("../config");
const { ApiError } = require("../utils/classes");

/**
 * @description Get all payments.
 * @route       GET /api/payments.
 * @access      Public.
 */
const getAll = asyncHandler(async (request, response, next) => {
  const { page, limit, pagination } = request.query;
  const options = {
    page,
    limit,
    pagination,
    sort: "-_id",
    populate: { path: "user" },
  };
  const query = { isDeleted: false, isActive: true };

  const payments = await Payment.paginate(query, options);
  response
    .status(statusCodes.OK)
    .json({ success: true, data: { payments }, error: null });
});

/**
 * @description Get one Payment.
 * @route       GET /api/payment/:paymentId.
 * @access      Public.
 */
const getOne = asyncHandler(async (request, response, next) => {
  const { paymentId } = request.params;

  const payment = await Payment.findOne({ _id: paymentId, isDeleted: false });
  if (!payment) {
    next(
      new ApiError(
        "Payment not found with id!",
        "RESOURCE_NOT_FOUND",
        statusCodes.NOT_FOUND
      )
    );
    return;
  }

  response
    .status(statusCodes.OK)
    .json({ success: true, data: { payment }, error: null });
});

/**
 * @description Create new payment.
 * @route       POST /api/payments.
 * @access      Private, only roles [ADMIN].
 */
const create = asyncHandler(async (request, response, next) => {
  const loggedUser = request.user;
  const { amount, user } = request.body;

  const payment = await Payment.create({
    amount,
    user,
    createdBy: loggedUser._id,
  });
  if (!payment) {
    next(
      new ApiError(
        "Failed to create payment!",
        "FAILED_CREATE",
        statusCodes.INTERNAL_ERROR
      )
    );
    return;
  }

  response
    .status(statusCodes.CREATED)
    .json({ success: true, data: { payment }, error: null });
});

/**
 * @description Update one payment.
 * @route       PUT /api/payments/:paymentId.
 * @access      Private, only roles [ADMIN].
 */
const updateOne = asyncHandler(async (request, response, next) => {
  const loggedUser = request.user;
  const { amount, user } = request.body;
  const { paymentId } = request.params;

  const payment = await Payment.findOne({ _id: paymentId, isDeleted: false });
  if (!payment) {
    next(
      new ApiError(
        "Payment not found with id!",
        "RESOURCE_NOT_FOUND",
        statusCodes.NOT_FOUND
      )
    );
    return;
  }

  const updatedPayment = await Payment.findOneAndUpdate(
    { _id: paymentId, isDeleted: false },
    {
      $set: {
        amount,
        user,
        lastEditBy: loggedUser._id,
        lastEditAt: new Date(Date.now()).toISOString(),
      },
    },
    { new: true }
  );
  if (!updatedPayment) {
    next(
      new ApiError(
        "Failed to update Payment!",
        "FAILED_UPDATE",
        statusCodes.INTERNAL_ERROR
      )
    );
    return;
  }

  response
    .status(statusCodes.CREATED)
    .json({ success: true, data: { author: updatedPayment }, error: null });
});

/**
 * @description Delete one payment.
 * @route       DELETE /api/payments/:paymentId.
 * @access      Private, only roles [ADMIN].
 */
const deleteOne = asyncHandler(async (request, response, next) => {
  const user = request.user;
  const { paymentId } = request.params;

  const payment = await Payment.findOne({ _id: paymentId, isDeleted: false });
  if (!payment) {
    next(
      new ApiError(
        "Payment not found with id!",
        "RESOURCE_NOT_FOUND",
        statusCodes.NOT_FOUND
      )
    );
    return;
  }

  const deletedPayment = await Payment.findOneAndUpdate(
    { _id: paymentId, isDeleted: false },
    {
      $set: {
        isDeleted: true,
        lastEditBy: user._id,
        lastEditAt: new Date(Date.now()).toISOString(),
      },
    },
    { new: true }
  );
  if (!deletedPayment) {
    next(
      new ApiError(
        "Failed to delete Payment!",
        "FAILED_DELETE",
        statusCodes.INTERNAL_ERROR
      )
    );
    return;
  }

  response
    .status(statusCodes.OK)
    .json({ success: true, data: { author: deletedPayment }, error: null });
});

// Exports of this file.
module.exports = { getAll, getOne, create, updateOne, deleteOne };
