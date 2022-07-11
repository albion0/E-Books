const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    text: { type: DataTypes.STRING, allowNull: false },
    user: { type: DataTypes.JSON, allowNull: false },
    userId: { type: DataTypes.STRING, allowNull: false },
  };

  return sequelize.define("ForumComment", attributes);
}
