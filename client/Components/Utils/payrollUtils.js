import axios from "axios";
import React from "react";

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const payPeriods = ["pp1", "pp2", "pp3", "pp4"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const mapMonths = (months) => {
  const monthsDropDownList = months.map((month, index) => (
    <option key={index} value={month}>
      {month}
    </option>
  ));

  return monthsDropDownList;
};

const mapPayPeriod = (payPeriod) => {
  const payPeriodDropDownList = payPeriod.map((week, index) => (
    <option key={index} value={week}>
      {week}
    </option>
  ));

  return payPeriodDropDownList;
};

const printTotalHours = (schedule) => {
  let totalHoursFrac = 0;

  for (let day in schedule) {
    const dailyHours = Number(schedule[day].totalFracHours);

    totalHoursFrac += dailyHours;
  }

  return totalHoursFrac.toFixed(2);
};

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

  const fractionedMinutes =
    Number(totalMinutes) === 0 ? "0.0" : (Number(totalMinutes) / 60).toString();

  return `${totalHours}.${fractionedMinutes.split(".")[1]}`;
};

const createPayrollInstance = async (
  schedule,
  employeeId,
  month,
  week,
  totalPay
) => {
  //each index will be a number.
  //monday, tuesday, weds, etc.

  const [monday, tuesday, wednesday, thursday, friday, saturday, sunday] =
    schedule;

  const payrollInstance = await axios.post("/api/payroll/create", {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    employeeId,
    month,
    week,
    totalPay,
  });

  return payrollInstance;
};

const hoursToArr = (weeklySchedule) => {
  const dailyHoursArr = [];

  for (let day in weeklySchedule) {
    const hours = weeklySchedule[day].totalFracHours;
    dailyHoursArr.push(hours);
  }

  return dailyHoursArr;
};

const getSinglePayroll = async (payrollId) => {
  const singlePayroll = await axios.get(`/api/payroll/${payrollId}`);

  return singlePayroll;
};

const printSinglePayroll = (payroll) => {
  //TODO: grab only the data you really need and ignore the rest of the fields you don't
  //TODO: change the createdAt date to a more readable and understandable date format
  let payrollArr = Object.keys(payroll);

  const payrollData = payrollArr.map((key, index) => {
    return <p key={index}>{`${key}: ${payroll[key]}`}</p>;
  });

  return payrollData;
};

const updateSinglePayroll = async (payroll, payrate) => {
  let totalHours = 0;

  for (let day of daysOfWeek) {
    totalHours += Number(payroll[day]);
  }

  const remainderHours = totalHours > 40 ? totalHours - 40 : 0;

  const totalPay = remainderHours
    ? (totalHours - remainderHours) * payrate + remainderHours * (payrate * 1.5)
    : totalHours * payrate;

  const {
    id,
    month,
    week,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = payroll;

  const updatedPayroll = await axios.put(`/api/payroll/update/${id}`, {
    id,
    month,
    week,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    totalPay,
  });

  return updatedPayroll;
};

const deletePayroll = async (payrollId) => {
  const deletedPayroll = await axios.delete(`/api/payroll/delete/${payrollId}`);

  return deletedPayroll;
};

export {
  TotalHoursCalc,
  TotalHoursFraction,
  printTotalHours,
  createPayrollInstance,
  hoursToArr,
  mapMonths,
  mapPayPeriod,
  getSinglePayroll,
  printSinglePayroll,
  updateSinglePayroll,
  deletePayroll,
  daysOfWeek,
  months,
  payPeriods,
};
