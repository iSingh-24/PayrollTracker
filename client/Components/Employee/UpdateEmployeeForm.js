/**
 *
 * TODO: Maybe set up a default value with what the user credentials currently are in the input tags
 */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleEmployee, updateEmployee } from "../Utils/employeeUtils";

const UpdateEmployeeForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [payrate, setPayrate] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [employee, setEmployee] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const loadSingleEmployee = async () => {
      const fetchedEmployee = await fetchSingleEmployee(id);
      const employeeData = fetchedEmployee.data;
      if (employeeData) {
        setEmployee(employeeData);
        setFirstName(employeeData.firstName || "");
        setLastName(employeeData.lastName || "");
        setPhoneNumber(employeeData.phoneNumber || "");
        setPayrate(employeeData.payrate || 0);
      }
    };

    loadSingleEmployee();
  }, []);

  const updateEmployeeHandler = async (e) => {
    e.preventDefault();
    const updatedEmployee = await updateEmployee({
      firstName,
      lastName,
      payrate,
      phoneNumber,
      id,
    });
    console.log(updatedEmployee.data, "here is the updated Employee");
  };

  const firstNameChangeHandler = ({ target }) => {
    const { value } = target;

    setFirstName(value);
  };

  const lastNameChangeHandler = ({ target }) => {
    const { value } = target;

    setLastName(value);
  };

  const payRateChangeHandler = ({ target }) => {
    const { value } = target;

    setPayrate(value);
  };

  const phoneNumberChangeHandler = ({ target }) => {
    const { value } = target;

    setPhoneNumber(value);
  };

  return (
    <div>
      <form type="submit" onSubmit={(e) => updateEmployeeHandler(e)}>
        <label>Update Firstname</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => firstNameChangeHandler(e)}
        />
        <label>Update Lastname</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => lastNameChangeHandler(e)}
        />
        <br></br>
        <label>Update Payrate</label>
        <input
          type="text"
          value={payrate}
          onChange={(e) => payRateChangeHandler(e)}
        />
        <label>Update Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => phoneNumberChangeHandler(e)}
        />
        <br></br>
        <br></br>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default UpdateEmployeeForm;
