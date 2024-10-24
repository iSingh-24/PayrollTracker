import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSinglePayroll,
  printSinglePayroll,
  deletePayroll,
} from "../Utils/payrollUtils";
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

  const onDeleteHandler = async (payrollId) => {
    await deletePayroll(payrollId);
    setCurrentPayroll({});
  };

  return (
    <div>
      {currentPayroll.id
        ? printSinglePayroll(currentPayroll)
        : "No Current Payroll"}
      {currentPayroll.id ? (
        <div>
          <Link to={`/payroll/update/${currentPayroll.id}`}>
            <button type="button">Update Payroll</button>
          </Link>
          <button
            type="button"
            onClick={() => onDeleteHandler(currentPayroll.id)}
          >
            Delete Payroll
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SinglePayroll;
