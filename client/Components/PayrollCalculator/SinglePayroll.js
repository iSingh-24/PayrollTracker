import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePayroll, printSinglePayroll } from "../Utils/payrollUtils";

const SinglePayroll = () => {
  const [currentPayroll, setCurrentPayroll] = useState({});

  const { id: payrollId } = useParams();

  useEffect(() => {
    const loadCurrentPayroll = async () => {
      const { data: currentPayroll } = await getSinglePayroll(payrollId);
      setCurrentPayroll(currentPayroll);
    };

    loadCurrentPayroll();
  }, []);

  return (
    <div>
      {currentPayroll.id
        ? printSinglePayroll(currentPayroll)
        : "No Current Payroll"}
    </div>
  );
};

export default SinglePayroll;
