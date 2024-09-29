const router = require("express").Router();

const Employee = require("../db/models/Employee");

//TODO: Should I include next in these routes

router.get("/", async (req, res, next) => {
  try {
    const employeeData = await Employee.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const allEmployeesArray = employeeData.map(
      (employee) => employee.dataValues
    );

    res.status(200).send(allEmployeesArray);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;

    const newEmployee = await Employee.create({
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    res.send(newEmployee);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
