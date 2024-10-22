import React, { useState, useEffect } from "react";
import { TotalHoursCalc, TotalHoursFraction } from "../Utils/payrollUtils";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./payrollCalc.css";
import { getAllEmployees, mapEmployees } from "../Utils/employeeUtils";
import {
  daysOfWeek,
  printTotalHours,
  hoursToArr,
  createPayrollInstance,
  mapMonths,
  mapPayPeriod,
  payPeriods,
  months,
} from "../Utils/payrollUtils";

/**
 * TODO
 *
 * 1) Instead of input tags used to track the time, figure out how to use flatpickr library or timepicker.js
 * 2) Understand how the date calculator function is working in terms of the 1000 * 60 * 60 and just in general.
 * 5) It seems like we're using the employee list multiple times, so instead of constantly calling it here, lets work toward creating a global store for any
 * component to grab the employees from.
 * 7) What if we need to adjust the payroll hours that were entered. Find a way to set up routing so that payroll model hours and dates can also be updated.
 * 9) Double check and see if any more necessary constraints need to be added.
 * 11) Double check if dropdowns are resetting properly after employee data is submitted. Also check and see if overtime pay and other calculations are still working properly
 * since we changed the default time from 0 to "".
 */

const PayrollCalculator = () => {
  const [employees, setEmployees] = useState([]);

  const [currentMonth, setCurrentMonth] = useState("");
  const [currentWeek, setCurrentWeek] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    employee: "",
    month: "",
    week: "",
  });

  const [daysAndHours, setDaysAndHours] = useState({
    monday: { startTime: "", endTime: "", hoursWorked: 0, totalFracHours: 0 },
    tuesday: { startTime: "", endTime: "", hoursWorked: 0, totalFracHours: 0 },
    wednesday: {
      startTime: "",
      endTime: "",
      hoursWorked: 0,
      totalFracHours: 0,
    },
    thursday: { startTime: "", endTime: "", hoursWorked: 0, totalFracHours: 0 },
    friday: { startTime: "", endTime: "", hoursWorked: 0, totalFracHours: 0 },
    saturday: { startTime: "", endTime: "", hoursWorked: 0, totalFracHours: 0 },
    sunday: { startTime: "", endTime: "", hoursWorked: 0, totalFracHours: 0 },
  });

  //I'm going to make the current employee as an object with the properties I need for simplicity purposes
  const [currentEmployee, setCurrentEmployee] = useState({
    fullName: "",
    id: "",
    payrate: "",
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

      let hoursAndMinutes = TotalHoursCalc(startTime, endTime);

      const hoursWorked =
        hoursAndMinutes[0] === "-" ? hoursAndMinutes.slice(1) : hoursAndMinutes;

      const totalFracHours = Math.abs(
        Number(TotalHoursFraction(hoursWorked)).toFixed(2)
      );

      if (!isNaN(totalFracHours)) {
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

    const selectedTagPayrate =
      target.options[target.selectedIndex].dataset.payrate;

    setCurrentEmployee({
      fullName: value,
      id: selectedTagId,
      payrate: selectedTagPayrate,
    });

    setSelectedOption(value);
  };

  const onMonthChangeHandler = ({ target }) => {
    const { value } = target;

    setCurrentMonth(value);
  };

  const onWeekChangeHandler = ({ target }) => {
    const { value } = target;

    setCurrentWeek(value);
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
  const monthlyDropDownList = mapMonths(months);
  const weeklyDropDownList = mapPayPeriod(payPeriods);

  const allDays = daysOfWeek.map((day, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "2px solid black",
        gap: "0.5rem",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <label style={{ flex: "1" }}>{`${day
        .slice(0, 1)
        .toUpperCase()
        .concat(day.slice(1))} Start Time`}</label>
      <input
        type="time"
        lang="en-US"
        style={{ backgroundColor: "lightGray", flex: "1" }}
        onChange={(e) => onStartHoursHandler(e, day)}
        value={daysAndHours[day].startTime}
      />
      <br></br>
      <label style={{ flex: "1" }}>{`${day
        .slice(0, 1)
        .toUpperCase()
        .concat(day.slice(1))} End Time`}</label>
      <input
        type="time"
        lang="en-US"
        style={{ backgroundColor: "lightGray", flex: "1" }}
        onChange={(e) => onEndHoursHandler(e, day)}
        value={daysAndHours[day].endTime}
      />
      <br></br>
      <label style={{ flex: "1" }}> Hours/Minutes Worked:</label>

      {daysAndHours[day] ? daysAndHours[day].hoursWorked : 0}
      <label style={{ flex: "1" }}>Total Hours Fraction:</label>
      <p style={{ flex: "1" }}>
        {" "}
        {daysAndHours[day] ? daysAndHours[day].totalFracHours : 0}
      </p>
    </div>
  ));

  const onPayrollSubmit = async (e) => {
    e.preventDefault();

    const totalHours = printTotalHours(daysAndHours); //this will give you the total hours

    const remainderHours = totalHours > 40 ? totalHours - 40 : 0;

    const totalPay = remainderHours
      ? (totalHours - remainderHours) * currentEmployee.payrate +
        remainderHours * (currentEmployee.payrate * 1.5)
      : totalHours * currentEmployee.payrate;

    createPayrollInstance(
      hoursToArr(daysAndHours),
      currentEmployee.id,
      currentMonth,
      currentWeek,
      totalPay
    );

    setDaysAndHours({
      monday: { startTime: "", endTime: "", hoursWorked: 0, totalFracHours: 0 },
      tuesday: {
        startTime: "",
        endTime: "",
        hoursWorked: 0,
        totalFracHours: 0,
      },
      wednesday: {
        startTime: "",
        endTime: "",
        hoursWorked: 0,
        totalFracHours: 0,
      },
      thursday: {
        startTime: "",
        endTime: "",
        hoursWorked: 0,
        totalFracHours: 0,
      },
      friday: { startTime: "", endTime: "", hoursWorked: 0, totalFracHours: 0 },
      saturday: {
        startTime: "",
        endTime: "",
        hoursWorked: 0,
        totalFracHours: 0,
      },
      sunday: { startTime: "", endTime: "", hoursWorked: 0, totalFracHours: 0 },
    });

    setCurrentEmployee({
      fullName: "",
      id: "",
      payrate: "",
    });

    setSelectedOption({ employee: "", month: "", week: "" });

    toast.success("Employee Payroll was successfully created", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <div className="container">
      <form type="submit" onSubmit={(e) => onPayrollSubmit(e)}>
        <div>{`Current Employee: ${currentEmployee.fullName}`}</div>
        <select
          onChange={(e) => onOptionChangeHandler(e)}
          value={selectedOption.employee}
        >
          <option value="">Choose an Employee</option>
          {employees.length ? (
            employeeDropDownList
          ) : (
            <option>no employees in database currently</option>
          )}
        </select>
        <select
          onChange={(e) => onMonthChangeHandler(e)}
          value={selectedOption.month}
        >
          <option value="">Choose an Month</option>
          {monthlyDropDownList}{" "}
        </select>
        <select
          onChange={(e) => onWeekChangeHandler(e)}
          value={selectedOption.week}
        >
          <option value="">Select Pay Period</option>
          {weeklyDropDownList}{" "}
        </select>
        <br></br>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: "1.0rem",
            gap: "0.5rem",
          }}
        >
          {allDays}
        </div>

        <br></br>
        <button
          type="button"
          style={{ fontSize: "1.5rem", backgroundColor: "lightGray" }}
          onClick={() => calculateHoursHandler()}
        >
          Calculate Hours
        </button>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />

        {currentEmployee.id ? <button>Submit Hours</button> : ""}
        <div>TOTAL HOURS FOR THE WEEK: {printTotalHours(daysAndHours)}</div>
      </form>
    </div>
  );
};

export default PayrollCalculator;
