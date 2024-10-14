import React from "react";
import axios from "axios";
/**
 * Function that will get all employees from Db
 */

const getAllEmployees = async () => {
  const response = await axios.get("/api/employees");

  const { data: allEmployees } = response;

  return allEmployees;
};

const createNewEmployee = async (newEmployee) => {
  const createdEmployee = await axios.post(
    "/api/employees/create",
    newEmployee
  );

  return createdEmployee;
};

const deleteEmployee = async (employeeId) => {
  const employeeDeleted = await axios.delete(`/api/employees/${employeeId}`);

  return employeeDeleted;
};

const fetchEmployees = async () => {
  const allEmployees = await getAllEmployees();

  return allEmployees;
};

//util function to fetch a single employee

const fetchSingleEmployee = async (employeeId) => {
  const singleEmployee = await axios.get(`/api/employees/${employeeId}`); //this is one way of handling it, the other way would be me sending the employee Id as json data

  return singleEmployee;
};

//update an employee

const updateEmployee = async (employeeCredentials) => {
  const { firstName, lastName, payrate, phoneNumber, id } = employeeCredentials;
  const updatedEmployee = await axios.put(`/api/employees/${id}`, {
    firstName,
    lastName,
    payrate,
    phoneNumber,
    id,
  });

  return updatedEmployee;
};

const mapEmployees = (employees) => {
  const employeeDropDownList = employees.map((employee) => (
    <option
      key={employee.id}
      value={`${employee.firstName} ${employee.lastName}`}
      data-employeeid={`${employee.id}`}
      data-payrate={employee.payrate}
    >{`${employee.firstName} ${employee.lastName}`}</option>
  ));

  return employeeDropDownList;
};

const printEmployeePayroll = (payroll) => {
  //payroll will be an array of objs

  const payrollData = payroll.map((payroll) => (
    <p
      key={payroll.id}
    >{`Month: ${payroll.month} Pay Period: ${payroll.week}`}</p>
  ));

  return payrollData;
};

export {
  getAllEmployees,
  createNewEmployee,
  deleteEmployee,
  fetchEmployees,
  fetchSingleEmployee,
  updateEmployee,
  mapEmployees,
  printEmployeePayroll,
};
