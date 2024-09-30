import React from "react";

const SingleEmployee = ({ employee, deleteEmployee }) => {
  return (
    <div>
      {employee.firstName}
      <button onClick={() => deleteEmployee(employee.id)}>X</button>
    </div>
  );
};

export default SingleEmployee;
