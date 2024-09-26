import React, { useState } from "react";
import "./payrollCalc.css";

/**
 * TODO
 *
 * 1) Instead of input tags used to track the time, figure out how to use flatpickr library or timepicker.js
 */

const PayrollCalculator = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const onStartChangeHandler = ({ target }) => {
    console.log(target.value, "this is the start time");
    console.log(target, "here is target");
    const { value } = target;
    setStartTime(value);
  };

  const onEndChangeHandler = ({ target }) => {
    console.log(target.value, "the value for end time is this");
    const { value } = target;
    setEndTime(value);
  };

  return (
    <div className="container">
      <label>Enter Start Time:</label>
      <input
        type="time"
        value={startTime}
        onChange={(e) => onStartChangeHandler(e)}
        lang="en-US"
      />
      <br></br>
      <label>Enter End Time:</label>
      <input
        type="time"
        value={endTime}
        onChange={(e) => onEndChangeHandler(e)}
        lang="en-US"
      />
      <br></br>
    </div>
  );
};

export default PayrollCalculator;
