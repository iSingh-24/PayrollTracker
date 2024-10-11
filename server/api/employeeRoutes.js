const router = require("express").Router();

const { Employee } = require("../db/models/relationships");
const { Payroll } = require("../db/models/relationships");

//TODO: Should I include next in these routes

router.get("/", async (req, res, next) => {
  try {
    const employeeData = await Employee.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: Payroll,
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
      include: [Payroll],
    });

    res.send(singleEmployee);
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, payrate } = req.body;

    const newEmployee = await Employee.create({
      firstName,
      lastName,
      phoneNumber,
      payrate,
    });

    res.send(newEmployee);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    //sequelize will only update the specified properties that are passed and leave the rest the same
    //for now I will start with just sending all fields to get updated

    const { firstName, lastName, payrate, phoneNumber, id } = req.body;

    const employeeToUpdate = await Employee.findByPk(id);

    const updatedEmployee = await employeeToUpdate.update({
      firstName,
      lastName,
      payrate,
      phoneNumber,
    });

    res.send(updatedEmployee);
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
