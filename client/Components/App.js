import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import PayrollCalculator from "./PayrollCalculator/PayrollCalculator";
import Header from "./Header/Header";
import EmployeeList from "./Employee/EmployeeList";
import Settings from "./Settings/Settings";
import CreateEmployeeForm from "./Employee/CreateEmployeeForm";
import SingleEmployee from "./Employee/SingleEmployee";
import UpdateEmployeeForm from "./Employee/UpdateEmployeeForm";
import SinglePayroll from "./PayrollCalculator/SinglePayroll";
import UpdatePayrollForm from "./PayrollCalculator/UpdatePayrollForm";
import "./app.css";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<PayrollCalculator />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/employees/create" element={<CreateEmployeeForm />} />
        <Route path={`/employees/:id`} element={<SingleEmployee />} />
        <Route
          path={`/employees/update/:id`}
          element={<UpdateEmployeeForm />}
        />
        <Route path={`/employees/payroll/:id`} element={<SinglePayroll />} />
        <Route path={`/payroll/update/:id`} element={<UpdatePayrollForm />} />
      </Routes>
    </div>
  );
};

export default App;
