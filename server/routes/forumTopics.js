// Imports: third-party packages.
const express = require("express");
const router = express.Router();

// Imports: local files.
const authorize = require("../middlewares/authorizeUser");
const protect = require("../middlewares/protect");
const { Admin } = require("../middlewares/roles");
const {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne,
} = require("../controllers/forumTopics");
const {
  createForumTopic,
  updateForumTopic,
  validateForumTopicId,
} = require("../validations/forumTopics");
const { validate } = require("../utils/functions");

// Mount routes accordingly.
router.route("/").get(getAll);
router
  .route("/")
  .post(authorize, protect(Admin), validate(createForumTopic), create);

router.route("/:forumTopicId").get(validate(validateForumTopicId), getOne);
router
  .route("/:forumTopicId")
  .put(authorize, protect(Admin), validate(updateForumTopic), updateOne);
router
  .route("/:forumTopicId")
  .delete(authorize, protect(Admin), validate(validateForumTopicId), deleteOne);

// Exports of this file.
module.exports = router;
