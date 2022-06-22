const dbConfig = require("../data/mysqlconfig.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = dbConfig.database;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
  });

  // init models and add them to the exported db object
  db.ForumTopic = require("../../models/ForumTopic")(sequelize);
  db.ForumComment = require("../../models/ForumComment")(sequelize);
  db.ForumTopic.hasMany(db.ForumComment);
  db.ForumComment.belongsTo(db.ForumTopic);

  // sync all models with database
  await sequelize.sync({ alter: true });
}
