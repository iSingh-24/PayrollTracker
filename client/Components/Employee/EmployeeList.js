import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../Utils/EmployeeUtils";
import SingleEmployee from "./SingleEmployee";

/**
 * TODO: Bring in the single employee component to properly display all the employees as a list
 */

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); // this needs to be called in sequence otherwise the dependency array will break (double check this to make sure that's how the sequence works)

  useEffect(() => {
    const fetchEmployees = async () => {
      const allEmployees = await getAllEmployees();

      setEmployees(allEmployees);
    };

    fetchEmployees(); //TODO: Double check if I have a fetchEmployees in a handler outside the useEffect that initiates the function every time its clicked, will it cause the useEffect to go into an endless rerender.
  }, [employees.length]);

  const allEmployees = employees.map((employee) => (
    <SingleEmployee key={employee.id} employee={employee} />
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
