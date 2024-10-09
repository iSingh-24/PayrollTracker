// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { fetchSingleEmployee, deleteEmployee } from "../Utils/employeeUtils";

// //TODO: Check to see if I need to unmount the component as well

// const SingleEmployee = () => {
//   const [currentEmployee, setCurrentEmployee] = useState("");

//   //if we are on this page, that means the params already has the employee id we need. So lets grab it from the params.

//   const { id } = useParams(); //so now that we have a way to get the id, lets make a call to the database to grab this user.

//   const deleteEmployeeHandler = async (employeeId) => {
//     await deleteEmployee(employeeId);
//   };

//   useEffect(() => {
//     const loadSingleEmployee = async (id) => {
//       const { data: singleEmployee } = await fetchSingleEmployee(id);
//       setCurrentEmployee(singleEmployee); //this will set the current employee as the fetched employee
//     };
//     loadSingleEmployee(id);
//   }, [currentEmployee]);

//   return currentEmployee ? (
//     <div>
//       {currentEmployee.firstName}

//       <Link to={`/employees/${currentEmployee.id}`}>
//         <button type="button">Update Employee</button>
//       </Link>
//       <br></br>
//       <button
//         type="button"
//         onClick={() => deleteEmployeeHandler(currentEmployee.id)}
//       >
//         Delete Employee
//       </button>
//     </div>
//   ) : (
//     <div>No Employee credentials here</div>
//   );
// };

// export default SingleEmployee;

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSingleEmployee, deleteEmployee } from "../Utils/employeeUtils";

//TODO: Check to see if I need to unmount the component as well

const SingleEmployee = ({ employeeId }) => {
  const [currentEmployee, setCurrentEmployee] = useState("");
  const { id: testId } = useParams();
  const id = employeeId || testId;

  useEffect(() => {
    const loadSingleEmployee = async (id) => {
      const { data: singleEmployee } = await fetchSingleEmployee(id);
      setCurrentEmployee(singleEmployee); //this will set the current employee as the fetched employee
    };

    loadSingleEmployee(id);
  }, [id]);

  return currentEmployee ? (
    <div>
      {currentEmployee.firstName}

      <Link to={`/employees/${currentEmployee.id}`}>
        <button type="button">Update Employee</button>
      </Link>
      <br></br>
    </div>
  ) : (
    <div>No Employee credentials here</div>
  );
};

export default SingleEmployee;
