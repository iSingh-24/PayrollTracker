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
    const dailyHours = schedule[day].totalFracHours;

    totalHoursFrac += dailyHours;
  }

  return Number(totalHoursFrac).toFixed(2);
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

export {
  TotalHoursCalc,
  TotalHoursFraction,
  printTotalHours,
  createPayrollInstance,
  hoursToArr,
  mapMonths,
  mapPayPeriod,
  daysOfWeek,
  months,
  payPeriods,
};
