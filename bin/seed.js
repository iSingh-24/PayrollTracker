const db = require("../server/db/db");
const User = require("../server/db/models/User");

const init = async () => {
  try {
    await db.sync({ force: true }); //this will drop and recreate tables
    console.log("Database was synced successfully");
    const testUsers = [
      { firstName: "Madara", lastName: "Uchiha", phoneNumber: 3478532123 },
      { firstName: "Ip", lastName: "Bryant", phoneNumber: 516422132 },
      { firstName: "Thor", lastName: "Vinland", phoneNumber: 5214213421 },
    ];

    const testUserPromises = testUsers.map((user) => User.create(user)); //this will map over and create a user object for each user
    const createdTestUsers = await Promise.all(testUserPromises); //this will wait for the creation of the users to be complete

    console.log("Users and Workouts were created successfully ");
  } catch (err) {
    console.log(`Error syncing the database: ${err}`);
  }
};

init();
