import React from "react";
import "./payrollCalc.css";

/**
 * TODO
 *
 * 1) Instead of input tags used to track the time, figure out how to use flatpickr library or timepicker.js
 */

const PayrollCalculator = () => {
  return (
    <div className="container">
      <label>Enter Start Time:</label>
      <br></br>
      <label>Enter End Time:</label>
      <input type="time" />
      <br></br>
    </div>
  );
};

export default PayrollCalculator;
