import React from "react";
import CreateEmployeeForm from "../Employee/CreateEmployeeForm";
import { Link } from "react-router-dom";

/**
 * TODO: Delete Employee, Add Employee
 */

const Settings = () => {
  return (
    <div>
      <Link to="/employees/create">Add Employee</Link>
      <br></br>
      <Link to="/employees/update">Update Employees</Link>
    </div>
  );
};

export default Settings;
