import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchSingleEmployee,
  printEmployeePayroll,
} from "../Utils/employeeUtils";

//TODO: Check to see if I need to unmount the component as well

const SingleEmployee = ({ employeeId, deleteEmployee }) => {
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
      <Link to={`/employees/${currentEmployee.id}`}>
        {currentEmployee.firstName}
      </Link>
      <br></br>

      <Link to={`/employees/update/${id}`}>
        <button>Update Employee</button>
      </Link>
      <br></br>
      <button type="button" onClick={() => deleteEmployee(id)}>
        Delete Employee
      </button>
      <br></br>
      <br></br>
      {testId ? (
        <div>
          <label>Dates Worked</label>
          {printEmployeePayroll(currentEmployee.payrolls)}
        </div>
      ) : (
        ""
      )}
    </div>
  ) : (
    <div>No Employee credentials here</div>
  );
};

export default SingleEmployee;
