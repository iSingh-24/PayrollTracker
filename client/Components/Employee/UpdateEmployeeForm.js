/**
 *
 * TODO: Maybe set up a default value with what the user credentials currently are in the input tags
 */

import React, { useState } from "react";

const UpdateEmployeeForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [payrate, setPayrate] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");

  const updateEmployeeHandler = (e) => {
    e.preventDefault();

    setFirstName("");
    setLastName("");
    setPayrate(0);
    setPhoneNumber("");

    console.log(`Update Employee Handler Clicked`);
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
      <form type="submit" onSubmit={() => updateEmployeeHandler()}>
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
      </form>
    </div>
  );
};

export default UpdateEmployeeForm;
