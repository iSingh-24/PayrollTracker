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
  console.log("This path was hit");
  const employeeDeleted = await axios.delete(`/api/employees/${employeeId}`);

  console.log("employee was deleted");

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

export { getAllEmployees, createNewEmployee, deleteEmployee, fetchEmployees };
