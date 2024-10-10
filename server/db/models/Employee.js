const db = require("../db");
const { DataTypes } = require("sequelize");

const Employee = db.define("employee", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  payrate: {
    type: DataTypes.DECIMAL(10, 2), //THIS WILL MAKE IT 10 DIGITS AND 2 DECIMAL PLACES
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Employee;
