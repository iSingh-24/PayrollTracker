import React, { useState } from "react";

const CreateUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const firstNameHandler = ({ target }) => {};
  const lastNameHandler = ({ target }) => {};
  const phoneNumberHandler = ({ target }) => {};

  const onSubmitHandler = (e) => {
    e.preventDefault;

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
      </form>
    </div>
  );
};

export default CreateUserForm;
