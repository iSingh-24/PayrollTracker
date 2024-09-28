import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../Utils/EmployeeUtils";

/**
 * TODO: Bring in the single employee component to properly display all the employees as a list
 */

const EmployeeList = () => {
  useEffect(() => {
    const fetchEmployees = async () => {
      const allEmployees = await getAllEmployees();
      console.log(allEmployees, "here is what I got from all employees");
      setEmployees(allEmployees);
    };

    fetchEmployees(); //TODO: Double check if I have a fetchEmployees in a handler outside the useEffect that initiates the function every time its clicked, will it cause the useEffect to go into an endless rerender.
  }, []);

  const [employees, setEmployees] = useState([]);
  console.log(
    `There are ${employees.length} number of employees in the database currently`
  );
  return <div>Employee List Component</div>;
};

export default EmployeeList;
