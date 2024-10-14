const db = require("../db");

const { DataTypes } = require("sequelize");

const Payroll = db.define("payroll", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  week: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monday: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  tuesday: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  wednesday: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  thursday: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  friday: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  saturday: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  sunday: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  totalPay: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

//if you want a more explicit foreign key you can define it in the payroll model

/**
 * for example you can have employeeId: {
 * type: DataTypes.UUID,
 * references: {
 * model: Employee,
 * key: 'id'}}
 *
 *
 * and then when you do the relationships it would be something like
 *
 * Payroll.belongsTo(Employee, {foreignKey: 'employeeId'});
 * Employee.hasMany(Payroll, {foreignKey: 'employeeId'})
 *
 *
 *
 * The reason we want to do Payroll as the belongs to Employee is that it defines the relationship
 * in a more clear manner, plus employees typically will have many payrolls week by week.It also
 * insures that each payroll entry is linked to exactly one employee only. Each employees payroll will
 * remain unique to them.
 */

module.exports = Payroll;
