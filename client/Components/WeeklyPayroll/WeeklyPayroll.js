import React, { useState, useEffect } from "react";
import {
  payPeriods,
  months,
  mapMonths,
  mapPayPeriod,
} from "../Utils/payrollUtils";

/**
 * TODO: This component will have eager loading where depending on the pay period and month we search
 * it will show the payrolls for those periods so we can get a general understanding of how much the payroll was for that week
 */

const WeeklyPayroll = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedPayPeriod, setSelectedPayPeriod] = useState("");
  const [filteredPayrolls, setFilteredPayrolls] = useState([]);

  const payPeriodDropdown = mapPayPeriod(payPeriods);
  const monthlyDropdown = mapMonths(months);

  const onPayPeriodChange = ({ target }) => {
    const filterByPeriod = target.options[target.selectedIndex].value;

    setSelectedPayPeriod(filterByPeriod);
  };

  const onMonthChangeHandler = ({ target }) => {
    const filterByMonth = target.options[target.selectedIndex].value;

    setSelectedMonth(filterByMonth);
  };

  const onSearchClick = () => {
    //this function will now send the month and payperiod that needed to be searched to the backend

    console.log(selectedMonth, selectedPayPeriod);
    console.log(`on search was clicked`);
  };

  return (
    <div>
      <label>Search Following Periods</label>
      <select onChange={(e) => onPayPeriodChange(e)} value={selectedPayPeriod}>
        <option value="">Choose a Pay Period</option>
        {payPeriodDropdown}
      </select>
      <select value={selectedMonth} onChange={(e) => onMonthChangeHandler(e)}>
        <option value="">Choose a Month</option>
        {monthlyDropdown}
      </select>
      <br></br>
      <button type="button" onClick={() => onSearchClick()}>
        Search
      </button>
      <div>
        <br></br>
        <label>Payroll List</label>
        <br></br>
        <br></br>
        {filteredPayrolls.length
          ? "Current payrolls"
          : "No payrolls were found with the criteria selected"}
      </div>
    </div>
  );
};

export default WeeklyPayroll;
