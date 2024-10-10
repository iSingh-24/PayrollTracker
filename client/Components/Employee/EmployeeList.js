import React, { useEffect, useState } from "react";
import {
  getAllEmployees,
  deleteEmployee,
  fetchEmployees,
} from "../Utils/employeeUtils";

import { Link } from "react-router-dom";
import SingleEmployee from "./SingleEmployee";

/**
 * TODO: Bring in the single employee component to properly display all the employees as a list
 * TODO: Look into a more efficient way to use fetchEmployees as a util function. Because we are returning something from it we need to make it await, is there a way around this?
 */

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); // this needs to be called in sequence otherwise the dependency array will break (double check this to make sure that's how the sequence works)

  useEffect(() => {
    const loadEmployees = async () => {
      const allEmployees = await getAllEmployees();

      setEmployees(allEmployees);
    };

    loadEmployees();
  }, [employees.length]);

  // const allEmployees = employees.map((employee) => (
  //   <li key={employee.id}>
  //     <Link to={`/employees/${employee.id}`}>{employee.firstName}</Link>
  //   </li>
  // ));

  const deleteEmployeeHandler = async (employeeId) => {
    const deletedEmployee = await deleteEmployee(employeeId);
    console.log("Employee was deleted");

    setEmployees(await fetchEmployees());
  };

  const allEmployees = employees.map((employee) => (
    <SingleEmployee
      employeeId={employee.id}
      key={employee.id}
      deleteEmployee={deleteEmployeeHandler}
    >
      <Link to={`/employees/${employee.id}`}>{employee.firstName}</Link>
    </SingleEmployee>
  ));

  return (
    <div>
      {allEmployees.length
        ? allEmployees
        : "There are no employees in the database currently"}
    </div>
  );
};

export default EmployeeList;
