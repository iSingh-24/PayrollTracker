import React from "react";
import { Link } from "react-router-dom";

const SingleEmployee = ({ employee, deleteEmployee }) => {
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
