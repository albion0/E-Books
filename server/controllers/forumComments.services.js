const db = require("../utils/functions/sequelize");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.ForumComment.findAll();
}

async function getById(id) {
  return await getForumComment(id);
}

async function create(params) {
  const forumComment = new db.ForumComment(params);

  // save forumComment
  await forumComment.save();
}

async function update(id, params) {
  const forumComment = await getForumComment(id);

  // copy params to forumComment and save
  Object.assign(forumComment, params);
  await forumComment.save();
}

async function _delete(id) {
  const forumComment = await getForumComment(id);
  await forumComment.destroy();
}

// helper functions

async function getForumComment(id) {
  const forumComment = await db.ForumComment.findByPk(id);
  if (!forumComment) throw "User not found";
  return forumComment;
}
