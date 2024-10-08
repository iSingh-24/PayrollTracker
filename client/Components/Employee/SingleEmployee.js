import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

//TODO: write useEffect hook to fetch a single employee from the database
//TODO: Update this component so I don't have the employee passed down, instead I am going to find out a way to grab the employee from the URL
//TODO: Check to see if I need to unmount the component as well
//TODO: Add a route to backend that will grab a single employee credential and send it to the frontend

const SingleEmployee = ({ employee, deleteEmployee }) => {
  const [currentEmployee, setCurrentEmployee] = useState("");

  //if we are on this page, that means the params already has the employee id we need. So lets grab it from the params.

  const { id } = useParams(); //so now that we have a way to get the id, lets make a call to the database to grab this user.

  useEffect(() => {
    //bring in a utils function to grab a single employee
    const fetchSingleEmployee = async () => {
      const singleEmployee = await fetchSingleEmployee(id);
      setCurrentEmployee(singleEmployee); //this will set the current employee as the fetched employee
    };
    //once the util function is written grab the employee credentials from useParams hook which should be able to get the employee ID that we need for the person we clicked on
    //use the useParams to send the data to the backend, then use sequelize hook for findByPk for employee and get that employee from the database and send the employee credentials to the frontend
    //after the credentials are sent take the data from the employee and replace how we're passing down the employee here. We can leave the delete employee method, but we should not have a need to pass down the employee this way
    //this means we probably need to pass down the ID a diff way, or look into that
  }, []);

  return employee ? (
    <div>
      {employee.firstName}
      <button onClick={() => deleteEmployee(employee.id)}>X</button>
      <Link to={`/employees/${employee.id}`}>
        <button type="button">Update Employee</button>
      </Link>
    </div>
  ) : (
    <div>No Employee credentials here</div>
  );
};

export default SingleEmployee;
