import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//TODO: write useEffect hook to fetch a single employee from the database
//TODO: Update this component so I don't have the employee passed down, instead I am going to find out a way to grab the employee from the URL
//TODO: Check to see if I need to unmount the component as well

const SingleEmployee = ({ employee, deleteEmployee }) => {
  const [currentEmployee, setCurrentEmployee] = useState("");

  useEffect(() => {
    console.log("single employee page was mounted");
  }, []);

  return employee ? (
    <div>
      {employee.firstName}
      <button onClick={() => deleteEmployee(employee.id)}>X</button>
      <Link to={`/employees/${employee.id}`}>
        <button type="button">Update Employee</button>
      </Link>
    </div>
  ) : (
    <div>No Employee credentials here</div>
  );
};

export default SingleEmployee;
