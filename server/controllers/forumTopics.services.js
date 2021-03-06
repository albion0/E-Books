const db = require("../utils/functions/sequelize");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.ForumTopic.findAll();
}

async function getById(id) {
  return await getForumTopic(id);
}

async function create(params, user, userId) {
  const payload = { ...params, user, userId };
  const forumTopic = new db.ForumTopic(payload);

  // save forumTopic
  await forumTopic.save();
  return forumTopic;
}

async function update(id, params) {
  const forumTopic = await getForumTopic(id);

  // copy params to forumTopic and save
  Object.assign(forumTopic, params);
  await forumTopic.save();
  return forumTopic;
}

async function _delete(id) {
  const forumTopic = await getForumTopic(id);
  await forumTopic.destroy();
}

// helper functions

async function getForumTopic(id) {
  const forumTopic = await db.ForumTopic.findByPk(id);
  if (!forumTopic) throw "User not found";
  return forumTopic;
}
