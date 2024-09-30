import React, { useState } from "react";
import { createNewEmployee } from "../Utils/employeeUtils";

const CreateEmployeeForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const firstNameHandler = ({ target }) => {
    const { value } = target;
    setFirstName(value);
  };
  const lastNameHandler = ({ target }) => {
    const { value } = target;
    setLastName(value);
  };
  const phoneNumberHandler = ({ target }) => {
    const { value } = target;
    setPhoneNumber(value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    await createNewEmployee({ firstName, lastName, phoneNumber });
    setFirstName("");
    setLastName("");
    setPhoneNumber("");

    //maybe add an alert here
  };

  return (
    <div>
      <form type="submit" onSubmit={onSubmitHandler}>
        <label>Enter User Credentials Below</label>
        <br></br>
        <input
          type="text"
          placeholder="enter first name"
          onChange={(e) => firstNameHandler(e)}
          value={firstName}
          required
        />
        <br></br>
        <input
          type="text"
          placeholder="enter last name"
          onChange={(e) => lastNameHandler(e)}
          value={lastName}
          required
        />
        <br></br>
        <input
          type="text"
          placeholder="enter phone number"
          onChange={(e) => phoneNumberHandler(e)}
          value={phoneNumber}
          required
        />
        <br></br>
        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateEmployeeForm;
