const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "root2000", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = sequelize;
