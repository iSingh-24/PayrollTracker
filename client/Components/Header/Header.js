import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <div>
      <div className="nav-links header">
        <Link to="/">Home</Link>
        <Link to="/calculator">Calculator</Link>
        <Link to="/employees">Employee List</Link>
      </div>
      <h1>Payroll Calculator</h1>
    </div>
  );
};

export default Header;
