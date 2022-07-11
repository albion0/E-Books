const { statusCodes } = require("../config");
const forumCommentService = require("./forumComments.services");

function getAll(req, res, next) {
  forumCommentService
    .getAll()
    .then((forumComments) =>
      res.status(statusCodes.OK).json({
        success: true,
        data: { forumComments },
        error: null,
      })
    )
    .catch(next);
}

function getTopicComments(req, res, next) {
  forumCommentService
    .getAllByTopic(req.query)
    .then((forumComments) =>
      res.status(statusCodes.OK).json({
        success: true,
        data: { forumComments },
        error: null,
      })
    )
    .catch(next);
}

function getOne(req, res, next) {
  forumCommentService
    .getById(req.params.id)
    .then((forumComment) =>
      res.status(statusCodes.OK).json({
        success: true,
        data: { forumComment },
        error: null,
      })
    )
    .catch(next);
}

function create(req, res, next) {
  const userId = req.user._id.toString();
  forumCommentService
    .create(req.body, req.user, userId)
    .then((forumComment) =>
      res.status(statusCodes.OK).json({
        success: true,
        data: { forumComment },
        error: null,
      })
    )
    .catch(next);
}

function updateOne(req, res, next) {
  forumCommentService
    .update(req.params.id, req.body)
    .then((forumComment) =>
      res.status(statusCodes.OK).json({
        success: true,
        data: { forumComment },
        error: null,
      })
    )
    .catch(next);
}

function deleteOne(req, res, next) {
  forumCommentService
    .delete(req.params.id)
    .then(() =>
      res.status(statusCodes.OK).json({
        success: true,
        data: { message: "Forum Comment deleted" },
        error: null,
      })
    )
    .catch(next);
}

// Exports of this file.
module.exports = {
  getAll,
  getTopicComments,
  getOne,
  create,
  updateOne,
  deleteOne,
};
