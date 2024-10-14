import React, { useState, useEffect } from "react";
import { TotalHoursCalc, TotalHoursFraction } from "../Utils/payrollUtils";
import "./payrollCalc.css";
import { getAllEmployees, mapEmployees } from "../Utils/employeeUtils";
import { daysOfWeek, printTotalHours } from "../Utils/payrollUtils";

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
  const [employees, setEmployees] = useState([]);
  const [daysAndHours, setDaysAndHours] = useState({
    monday: { startTime: 0, endTime: 0, hoursWorked: 0, totalFracHours: 0 },
    tuesday: { startTime: 0, endTime: 0, hoursWorked: 0, totalFracHours: 0 },
    wednesday: { startTime: 0, endTime: 0, hoursWorked: 0, totalFracHours: 0 },
    thursday: { startTime: 0, endTime: 0, hoursWorked: 0, totalFracHours: 0 },
    friday: { startTime: 0, endTime: 0, hoursWorked: 0, totalFracHours: 0 },
    saturday: { startTime: 0, endTime: 0, hoursWorked: 0, totalFracHours: 0 },
    sunday: { startTime: 0, endTime: 0, hoursWorked: 0, totalFracHours: 0 },
  });

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
    for (let day of daysOfWeek) {
      const startTime = daysAndHours[day]["startTime"];
      const endTime = daysAndHours[day]["endTime"];

      const hoursWorked = TotalHoursCalc(startTime, endTime);

      const totalFracHours = Number(TotalHoursFraction(hoursWorked)).toFixed(2);

      if (!isNaN(totalFracHours)) {
        console.log("this was hit");
        setDaysAndHours((prevState) => ({
          ...prevState,
          [day]: { ...prevState[day], hoursWorked, totalFracHours },
        }));
      }
    }
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

  const onStartHoursHandler = ({ target }, day) => {
    const startTime = target.value;

    //this will ensure we don't overwrite the whole state object because it can be tricky when using nested objects or objects in general
    setDaysAndHours((prevState) => ({
      ...prevState,
      [day]: { ...prevState[day], startTime },
    }));
  };

  const onEndHoursHandler = ({ target }, day) => {
    const endTime = target.value;

    //this will ensure we don't overwrite the whole state object because it can be tricky when using nested objects or objects in general
    setDaysAndHours((prevState) => ({
      ...prevState,
      [day]: { ...prevState[day], endTime },
    }));
  };

  const employeeDropDownList = mapEmployees(employees);

  const allDays = daysOfWeek.map((day, index) => (
    <div
      key={index}
      style={{ display: "flex", border: "2px solid black", gap: "1rem" }}
    >
      <label>{`${day} Start Time`}</label>
      <input
        type="time"
        lang="en-US"
        onChange={(e) => onStartHoursHandler(e, day)}
      />
      <br></br>
      <label>{`${day} End Time`}</label>
      <input
        type="time"
        lang="en-US"
        onChange={(e) => onEndHoursHandler(e, day)}
      />
      <br></br>
      <label>Total Hours Worked:</label>

      {daysAndHours[day] ? daysAndHours[day].hoursWorked : 0}
      <label>Total Hours Fraction:</label>
      <p> {daysAndHours[day] ? daysAndHours[day].totalFracHours : 0}</p>
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
          fontSize: "1.5rem",
          gap: "0.5rem",
        }}
      >
        {allDays}
      </div>

      <br></br>
      <button type="button" onClick={() => calculateHoursHandler()}>
        Calculate Hours
      </button>

      <button>Submit Hours</button>
      <div>TOTAL HOURS: {printTotalHours(daysAndHours)}</div>
    </div>
  );
};

export default PayrollCalculator;
