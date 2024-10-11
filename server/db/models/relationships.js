const Employee = require("./Employee");
const Payroll = require("./Payroll");
const db = require("../db");

Employee.hasMany(Payroll);
Payroll.belongsTo(Employee);

module.exports = { Employee, Payroll, db };
