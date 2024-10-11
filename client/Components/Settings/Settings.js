import React from "react";

import { Link } from "react-router-dom";

/**
 * TODO: Delete Employee, Add Employee
 */

const Settings = () => {
  return (
    <div>
      <Link to="/employees/create">Add Employee</Link>
    </div>
  );
};

export default Settings;
