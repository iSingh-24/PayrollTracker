import React, { useState } from "react";
import "./payrollCalc.css";

/**
 * TODO
 *
 * 1) Instead of input tags used to track the time, figure out how to use flatpickr library or timepicker.js
 * 2) Make a function that will find the decimal value of the minutes and hours
 */

const PayrollCalculator = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const TotalHoursCalc = (startTime, endTime) => {
    const start = new Date(`1940-03-01T${startTime}`);
    const end = new Date(`1940-03-01T${endTime}`);

    const totalHoursMilli = end - start;

    const totalHours = totalHoursMilli / (1000 * 60 * 60);

    const hours = Math.floor(totalHours); //this will give you the hours as a whole
    const minutes = Math.round((totalHours - hours) * 60);

    return `Employee worked ${hours} hours and ${minutes} minutes`;
  };

  const calculateHoursHandler = () => {
    console.log(TotalHoursCalc(startTime, endTime));
  };

  const onStartChangeHandler = ({ target }) => {
    console.log(target.value, "this is the start time");
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
      <button type="button" onClick={() => calculateHoursHandler()}>
        Calculate Hours
      </button>
    </div>
  );
};

export default PayrollCalculator;
