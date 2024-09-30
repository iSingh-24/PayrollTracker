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

export { getAllEmployees, createNewEmployee, deleteEmployee };
