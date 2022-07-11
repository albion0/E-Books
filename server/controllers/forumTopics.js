const { statusCodes } = require("../config");
const forumTopicService = require("./forumTopics.services");

function getAll(req, res, next) {
  forumTopicService
    .getAll()
    .then((forumTopics) =>
      res.status(statusCodes.OK).json({
        success: true,
        data: { forumTopics },
        error: null,
      })
    )
    .catch(next);
}

function getOne(req, res, next) {
  forumTopicService
    .getById(req.params.id)
    .then((forumTopic) =>
      res.status(statusCodes.OK).json({
        success: true,
        data: { forumTopic },
        error: null,
      })
    )
    .catch(next);
}

function create(req, res, next) {
  const userId = req.user._id.toString();
  forumTopicService
    .create(req.body, req.user, userId)
    .then((forumTopic) =>
      res.status(statusCodes.OK).json({
        success: true,
        data: { forumTopic },
        error: null,
      })
    )
    .catch(next);
}

function updateOne(req, res, next) {
  forumTopicService
    .update(req.params.id, req.body)
    .then((forumTopic) =>
      res.status(statusCodes.OK).json({
        success: true,
        data: { forumTopic },
        error: null,
      })
    )
    .catch(next);
}

function deleteOne(req, res, next) {
  forumTopicService
    .delete(req.params.id)
    .then(() =>
      res.status(statusCodes.OK).json({
        success: true,
        data: { message: "Forum Topic deleted" },
        error: null,
      })
    )
    .catch(next);
}

// Exports of this file.
module.exports = { getAll, getOne, create, updateOne, deleteOne };
