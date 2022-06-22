const { DataTypes } = require("sequelize");
const ForumComment = require("./ForumComment");

module.exports = model;

function model(sequelize) {
  const attributes = {
    topic: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
  };

  return sequelize.define("ForumTopic", attributes);
}
