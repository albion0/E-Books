const forumCommentService = require("./forumComments.services");

function getAll(req, res, next) {
  forumCommentService
    .getAll()
    .then((forumComments) => res.json(forumComments))
    .catch(next);
}

function getOne(req, res, next) {
  forumCommentService
    .getById(req.params.id)
    .then((forumComment) => res.json(forumComment))
    .catch(next);
}

function create(req, res, next) {
  forumCommentService
    .create(req.body)
    .then(() => res.json({ message: "Forum Comment created" }))
    .catch(next);
}

function updateOne(req, res, next) {
  forumCommentService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Forum Comment updated" }))
    .catch(next);
}

function deleteOne(req, res, next) {
  forumCommentService
    .delete(req.params.id)
    .then(() => res.json({ message: "Forum Comment deleted" }))
    .catch(next);
}

// Exports of this file.
module.exports = { getAll, getOne, create, updateOne, deleteOne };
