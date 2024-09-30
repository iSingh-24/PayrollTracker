import React from "react";
import { deleteEmployee } from "../Utils/employeeUtils";

const SingleEmployee = ({ employee }) => {
  return (
    <div>
      {employee.firstName}
      <button onClick={() => deleteEmployee(employee.id)}>X</button>
    </div>
  );
};

export default SingleEmployee;
