const db = require("../server/db/db");

const init = async () => {
  try {
    await db.sync({ force: true }); //this will drop and recreate tables
    console.log("Database was synced successfully");
    // const testUsers = [
    //   { firstName: "Madara", lastName: "Uchiha", email: "uchiha@gmail.com" },
    //   { firstName: "Ip", lastName: "Bryant", email: "Mamba@gmail.com" },
    //   { firstName: "Thor", lastName: "Vinland", email: "Valhalla@gmail.com" },
    // ];

    const testUserPromises = testUsers.map((user) => User.create(user)); //this will map over and create a user object for each user
    const createdTestUsers = await Promise.all(testUserPromises); //this will wait for the creation of the users to be complete

    console.log("Users and Workouts were created successfully ");
  } catch (err) {
    console.log(`Error syncing the database: ${err}`);
  }
};

init();
