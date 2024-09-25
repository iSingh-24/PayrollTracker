import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import PayrollCalculator from "./PayrollCalculator/PayrollCalculator";
import Header from "./Header/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<PayrollCalculator />} />
      </Routes>
    </div>
  );
};

export default App;
