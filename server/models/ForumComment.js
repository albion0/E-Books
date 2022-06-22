const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    // topic: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
  };

  return sequelize.define("ForumComment", attributes);
}
