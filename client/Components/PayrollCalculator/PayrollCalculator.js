import React, { useState } from "react";
import { TotalHoursCalc, TotalHoursFraction } from "../Utils/payrollUtils";
import "./payrollCalc.css";

/**
 * TODO
 *
 * 1) Instead of input tags used to track the time, figure out how to use flatpickr library or timepicker.js
 * 2) Make a function that will find the decimal value of the minutes and hours
 * 3) Understand how the date calculator function is working in terms of the 1000 * 60 * 60 and just in general.

 */

const PayrollCalculator = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalHoursWorked, setTotalHoursWorked] = useState(0);
  const [payrollHours, setPayrollHours] = useState(0);

  const calculateHoursHandler = () => {
    const totalHours = TotalHoursCalc(startTime, endTime);
    setTotalHoursWorked(totalHours);

    setPayrollHours(Number(TotalHoursFraction(totalHours)).toFixed(2)); //we're going to pass in total hours because the state is updating asynchronously
  };

  const onStartChangeHandler = ({ target }) => {
    const { value } = target;
    setStartTime(value);
  };

  const onEndChangeHandler = ({ target }) => {
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
