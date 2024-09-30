import React, { useEffect, useState } from "react";
import {
  getAllEmployees,
  deleteEmployee,
  fetchEmployees,
} from "../Utils/employeeUtils";
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

  const deleteEmployeeHandler = async (employeeId) => {
    await deleteEmployee(employeeId);

    const allEmployees = await fetchEmployees();

    setEmployees(allEmployees);
  };

  const allEmployees = employees.map((employee) => (
    <SingleEmployee
      key={employee.id}
      employee={employee}
      deleteEmployee={deleteEmployeeHandler}
    />
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
