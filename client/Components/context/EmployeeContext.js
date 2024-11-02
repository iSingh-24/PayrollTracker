import React, { createContext, useReducer, useContext } from "react";
import {
  GET_ALL_EMPLOYEES,
  SET_EMPLOYEE,
} from "./ActionCreators/EmployeeActionCreators";

const GlobalEmployeeContext = createContext();

const initialState = {
  employee: "",
  text: "This is the initial state for the context",
};

const employeeReducer = (state, action) => {
  switch (action.type) {
    case SET_EMPLOYEE:
      return { ...state, employee: action.payload };
    case GET_ALL_EMPLOYEES:
      return { ...state, allEmployees: action.payload };
    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  return (
    <GlobalEmployeeContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalEmployeeContext.Provider>
  );
};

export const GlobalEmployeeState = () => useContext(GlobalEmployeeContext);
