import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePayroll, printSinglePayroll } from "../Utils/payrollUtils";
import { Link } from "react-router-dom";

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
      <Link to={`/payroll/update/${currentPayroll.id}`}>
        <button type="button">Update Payroll</button>
      </Link>
    </div>
  );
};

export default SinglePayroll;
