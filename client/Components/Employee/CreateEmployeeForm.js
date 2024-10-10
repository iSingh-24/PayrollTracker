import React, { useState } from "react";
import { createNewEmployee } from "../Utils/employeeUtils";

const CreateEmployeeForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [payrate, setPayrate] = useState("");

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

  const payrateHandler = ({ target }) => {
    const { value } = target;

    setPayrate(value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    await createNewEmployee({ firstName, lastName, phoneNumber, payrate });
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setPayrate("");

    alert("Employee Successfully Created");
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
        <input
          type="text"
          placeholder="enter payrate"
          onChange={(e) => payrateHandler(e)}
          value={payrate}
          required
        />
        <br></br>
        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateEmployeeForm;
