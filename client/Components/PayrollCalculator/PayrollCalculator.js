import React, { useState, useEffect } from "react";
import { TotalHoursCalc, TotalHoursFraction } from "../Utils/payrollUtils";
import "./payrollCalc.css";
import { getAllEmployees, mapEmployees } from "../Utils/employeeUtils";
import { daysOfWeek } from "./PayrollUtils";

/**
 * TODO
 *
 * 1) Instead of input tags used to track the time, figure out how to use flatpickr library or timepicker.js
 * 2) Understand how the date calculator function is working in terms of the 1000 * 60 * 60 and just in general.
 * 3) Have an employee dropdown list 
 * 4) Incorporate current date so that the day the payroll is done can also be noted
 * 5) It seems like we're using the employee list multiple times, so instead of constantly calling it here, lets work toward creating a global store for any 
 * component to grab the employees from.
 * 6) Grab the employee who we want to add the associated payroll hours with. 
 * 7) What if we need to adjust the payroll hours that were entered. Find a way to set up routing so that payroll model hours and dates can also be updated. 

 */

const PayrollCalculator = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalHoursWorked, setTotalHoursWorked] = useState(0);
  const [payrollHours, setPayrollHours] = useState(0);
  const [employees, setEmployees] = useState([]);

  //I'm going to make the current employee as an object with the properties I need for simplicity purposes
  const [currentEmployee, setCurrentEmployee] = useState({
    fullName: "",
    id: "",
  });

  useEffect(() => {
    const loadEmployees = async () => {
      const allEmployees = await getAllEmployees();

      setEmployees(allEmployees);
    };

    loadEmployees();
  }, []);

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

  /**
   * NOTES: in the option handler below, in order to get the employe id we had to go a roundabout way to access it.
   *
   * the dataset property will get the custom tags we have in the options tags and the property following that needs to be all lowercase
   *
   * Remember you have to use dataset even though in the other function we named the property using, data-employeeid = `${employeeid}`
   */
  const onOptionChangeHandler = ({ target }) => {
    const { value } = target;

    const selectedTagId =
      target.options[target.selectedIndex].dataset.employeeid;
    setCurrentEmployee({ fullName: value, id: selectedTagId });
  };

  const employeeDropDownList = mapEmployees(employees);

  const allDays = daysOfWeek.map((day, index) => (
    <div key={index}>
      <label>{`${day} Hours Start Time`}</label>
      <input type="time" lang="en-US" />
      <br></br>
      <label>{`${day} Hours End Time`}</label>
      <input type="time" lang="en-US" />
    </div>
  ));

  return (
    <div className="container">
      <div>{`Current Employee: ${currentEmployee.fullName}`}</div>
      <select onChange={(e) => onOptionChangeHandler(e)}>
        <option value="">Choose an Employee</option>
        {employees.length ? (
          employeeDropDownList
        ) : (
          <option>no employees in database currently</option>
        )}
      </select>
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "1rem",
          gap: "0.5rem",
          border: "2px solid black",
        }}
      >
        {allDays}
        <input
          type="time"
          value={startTime}
          onChange={(e) => onStartChangeHandler(e)}
          lang="en-US"
        />
      </div>
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
      <button>Submit Hours</button>
    </div>
  );
};

export default PayrollCalculator;
