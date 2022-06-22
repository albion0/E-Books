const forumTopicService = require("./forumTopics.services");

function getAll(req, res, next) {
  forumTopicService
    .getAll()
    .then((forumTopics) => res.json(forumTopics))
    .catch(next);
}

function getOne(req, res, next) {
  forumTopicService
    .getById(req.params.id)
    .then((forumTopic) => res.json(forumTopic))
    .catch(next);
}

function create(req, res, next) {
  forumTopicService
    .create(req.body)
    .then(() => res.json({ message: "Forum Topic created" }))
    .catch(next);
}

function updateOne(req, res, next) {
  forumTopicService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Forum Topic updated" }))
    .catch(next);
}

function deleteOne(req, res, next) {
  forumTopicService
    .delete(req.params.id)
    .then(() => res.json({ message: "Forum Topic deleted" }))
    .catch(next);
}

// Exports of this file.
module.exports = { getAll, getOne, create, updateOne, deleteOne };
