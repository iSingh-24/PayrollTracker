import React, { useState } from "react";
import "./payrollCalc.css";

/**
 * TODO
 *
 * 1) Instead of input tags used to track the time, figure out how to use flatpickr library or timepicker.js
 * 2) Make a function that will find the decimal value of the minutes and hours
 * 3) Understand how the date calculator function is working in terms of the 1000 * 60 * 60 and just in general.
 * 4) Move the functions to a utils file for cleaner code
 */

const PayrollCalculator = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalHoursWorked, setTotalHoursWorked] = useState(0);
  const [payrollHours, setPayrollHours] = useState(0);

  const TotalHoursCalc = (startTime, endTime) => {
    const start = new Date(`1940-03-01T${startTime}`);
    const end = new Date(`1940-03-01T${endTime}`);

    const totalHoursMilli = end - start;

    const totalHours = totalHoursMilli / (1000 * 60 * 60);

    const hours = Math.floor(totalHours); //this will give you the hours as a whole
    const calcMinutes = Math.round((totalHours - hours) * 60);
    const minutes = calcMinutes < 10 ? `0${calcMinutes}` : calcMinutes;

    return `${hours}:${minutes}`;
  };

  const TotalHoursFraction = (hours) => {
    const [totalHours, totalMinutes] = hours.split(":");

    const fractionedMinutes = Number(totalMinutes) / 60;
    console.log(fractionedMinutes, "here are fractioned minutes");
    console.log(typeof fractionedMinutes);
    return `${totalHours}.${fractionedMinutes.toString().split(".")[1]}`;
  };

  const calculateHoursHandler = () => {
    const totalHours = TotalHoursCalc(startTime, endTime);
    setTotalHoursWorked(totalHours);
    setPayrollHours(Number(TotalHoursFraction(totalHours)).toFixed(2));
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
      <div
        style={{
          display: "flex",
          padding: "10px",
        }}
      >
        <h3 style={{ fontSize: "1.5rem", paddingRight: "1.5rem" }}>
          Total Hours Worked
        </h3>
        <input
          type="text"
          value={totalHoursWorked}
          style={{ fontSize: "1.5rem" }}
          disabled
        />
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <h3 style={{ fontSize: "1.5rem", paddingRight: "1.5rem" }}>
          Total Hours Fraction
        </h3>
        <input
          type="text"
          value={payrollHours}
          style={{ fontSize: "1.5rem" }}
          disabled
        />
      </div>
    </div>
  );
};

export default PayrollCalculator;
