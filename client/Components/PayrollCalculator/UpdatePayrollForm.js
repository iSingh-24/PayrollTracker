import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePayroll, updateSinglePayroll } from "../Utils/payrollUtils";
import { fetchSingleEmployee } from "../Utils/employeeUtils";

//TODO: Get rid of the updated at, created at employeeId and id fields
//TODO: Figure out how to get the rate of the current employee in an easier manner so that we can calculate and update the new toal pay
//To be honest for the issue above, there probably is a way to automatically handle tasks like that on the backend. Look into it

const UpdatePayrollForm = () => {
  const [currentPayroll, setCurrentPayroll] = useState({});
  const [payrate, setPayrate] = useState(0);

  const { id: paramId } = useParams();

  useEffect(() => {
    const loadPayroll = async () => {
      const payroll = await getSinglePayroll(paramId);
      const { data: singleEmployeeData } = await fetchSingleEmployee(
        payroll.data.employeeId
      );

      const { payrate } = singleEmployeeData;

      setPayrate(payrate);

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
        totalPay,
      } = payroll.data;
      const payrollData = {
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
      };
      setCurrentPayroll(payrollData);
    };

    loadPayroll();
  }, []);

  const onPayrollChangeHandler = ({ target }, currentKey) => {
    setCurrentPayroll((prevPayroll) => ({
      ...prevPayroll,
      [currentKey]: target.value,
    }));
  };

  const onUpdateSubmit = async (e) => {
    e.preventDefault();

    const { data: updatedPayroll } = await updateSinglePayroll(
      currentPayroll,
      payrate
    );

    const payroll = await getSinglePayroll(paramId);

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
      totalPay,
    } = payroll.data;
    const payrollData = {
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
    };
    setCurrentPayroll(payrollData);
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
      <form onSubmit={(e) => onUpdateSubmit(e)}>
        {payrollKeys.length ? payrollFields : ""}
        <button type="submit">Update Payroll</button>
      </form>
    </div>
  );
};

export default UpdatePayrollForm;
