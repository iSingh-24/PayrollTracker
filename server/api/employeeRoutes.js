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

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const singleEmployee = await Employee.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.send(singleEmployee);
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body;
    console.log(req.body, "here is req body");
    const newEmployee = await Employee.create({
      firstName,
      lastName,
      phoneNumber,
    });

    res.send(newEmployee);
  } catch (err) {
    next(err);
  }
});

router.delete(`/:id`, async (req, res, next) => {
  try {
    const { id: employeeId } = req.params;
    const employeeToDelete = await Employee.findByPk(employeeId);
    await employeeToDelete.destroy();
    res.send("employee was successfully deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
