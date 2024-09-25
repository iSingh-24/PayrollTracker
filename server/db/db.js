const Sequelize = require("sequelize");
const config = {
  logging: false, // Disables SQL query logging in the console
};

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/payrolltracker",
  config
);

module.exports = db;
