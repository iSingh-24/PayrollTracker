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

export { getAllEmployees, createNewEmployee };
