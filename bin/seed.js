// const db = require("../server/db/db");
// const Employee = require("../server/db/models/Employee");
// const Payroll = require("../server/db/models/Payroll");

const { db } = require("../server/db/models/relationships");
const { Employee } = require("../server/db/models/relationships");
const { Payroll } = require("../server/db/models/Payroll");
/**
 * TODO: Eventually incorporate an email tab in the model and update accordingly
 * TODO: For now we're bringing the models in and defining the relationships here. I want to have a centralized way to have the models imported in the future
 */

//Define relationships here for now

// Employee.hasMany(Payroll);
// Payroll.belongsTo(Employee);

const init = async () => {
  try {
    await db.sync({ force: true }); //this will drop and recreate tables
    console.log("Database was synced successfully");
    const testEmployees = [
      {
        firstName: "Madara",
        lastName: "Uchiha",
        phoneNumber: 3478532123,
        payrate: 15.0,
      },
      {
        firstName: "Ip",
        lastName: "Bryant",
        phoneNumber: 516422132,
        payrate: 25.5,
      },
      {
        firstName: "Thor",
        lastName: "Vinland",
        phoneNumber: 5214213421,
        payrate: 20.0,
      },
    ];

    const testEmployeePromises = testEmployees.map((employee) =>
      Employee.create(employee)
    ); //this will map over and create a user object for each user
    const createdTestEmployees = await Promise.all(testEmployeePromises); //this will wait for the creation of the users to be complete

    console.log("Employees were created successfully ");
  } catch (err) {
    console.log(`Error syncing the database: ${err}`);
  }
};

init();
