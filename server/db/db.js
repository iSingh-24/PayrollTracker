const Sequelize = require("sequelize");
const config = {
  logging: false, // Disables SQL query logging in the console
};

// const db = new Sequelize(
//   process.env.DATABASE_URL || "postgres://localhost/payrolltracker",
//   config
// );

const isProduction = process.env.NODE_ENV === "production";

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/payrolltracker",
  {
    ...config,
    dialectOptions: {
      ssl: isProduction
        ? {
            require: true,
            rejectUnauthorized: false, // Adjust based on your security needs
          }
        : false, // Disable SSL for local development
    },
  }
);

module.exports = db;
