// Imports: third-party packages.
const express = require("express");
const router = express.Router();

// Imports: local files.
const authorize = require("../middlewares/authorizeUser");
const protect = require("../middlewares/protect");
const { Admin, User } = require("../middlewares/roles");
const {
  getAll,
  getTopicComments,
  getOne,
  create,
  updateOne,
  deleteOne,
} = require("../controllers/forumComments");
const {
  topicComments,
  createForumComment,
  updateForumComment,
  validateForumCommentId,
} = require("../validations/forumComments");
const { validate } = require("../utils/functions");

// Mount routes accordingly.
router.route("/").get(getAll);
router.route("/comments").get(validate(topicComments), getTopicComments);
router
  .route("/")
  .post(authorize, protect(Admin, User), validate(createForumComment), create);

router.route("/:forumCommentId").get(validate(validateForumCommentId), getOne);
router
  .route("/:forumCommentId")
  .put(
    authorize,
    protect(Admin, User),
    validate(updateForumComment),
    updateOne
  );
router
  .route("/:forumCommentId")
  .delete(
    authorize,
    protect(Admin),
    validate(validateForumCommentId),
    deleteOne
  );

// Exports of this file.
module.exports = router;
