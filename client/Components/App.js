import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";

const App = () => {
  return (
    <div>
      <h1>Payroll Calculator</h1>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
