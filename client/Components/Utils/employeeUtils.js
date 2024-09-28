import axios from "axios";

/**
 * Function that will get all employees from Db
 */

const getAllEmployees = async () => {
  const response = await axios.get("/api/employees");

  const { data: allEmployees } = response;
  return allEmployees;
};

export { getAllEmployees };
