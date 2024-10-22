import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePayroll } from "../Utils/payrollUtils";

//TODO: Get rid of the updated at, created at employeeId and id fields

const UpdatePayrollForm = () => {
  const [currentPayroll, setCurrentPayroll] = useState({});
  const [payPeriodObj, setPayPeriodObj] = useState({
    month: "",
    week: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const loadPayroll = async () => {
      const payroll = await getSinglePayroll(id);
      const {
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
      } = payroll.data;
      const payrollData = {
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
      };
      setCurrentPayroll(payrollData);
    };

    loadPayroll();
  }, []);

  const onPayrollChangeHandler = ({ target }, currentKey) => {
    console.log(target.value, "here is target value");
    console.log(currentKey, "here is current key");

    setCurrentPayroll((prevPayroll) => ({
      ...prevPayroll,
      [currentKey]: target.value,
    }));
  };

  const payrollKeys = Object.keys(currentPayroll);

  const payrollFields = payrollKeys.map((key, index) => (
    <div key={index}>
      <label>{key}</label>
      <input
        type="text"
        value={currentPayroll[key]}
        onChange={(e) => onPayrollChangeHandler(e, key)}
      />
    </div>
  ));

  return (
    <div>
      <form>{payrollKeys.length ? payrollFields : ""}</form>
      Update Payroll
    </div>
  );
};

export default UpdatePayrollForm;
