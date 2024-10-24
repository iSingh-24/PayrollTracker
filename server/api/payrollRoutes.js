const router = require("express").Router();

const { Payroll } = require("../db/models/relationships");

router.get("/", (req, res, next) => {
  try {
    res.send("PAYROLL ROUTE GETTING HIT SUCCESSFULLY");
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      month,
      week,
      totalPay,
      employeeId,
    } = req.body;
    const createdPayroll = await Payroll.create({
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      month,
      week,
      totalPay,
      employeeId,
    });
    res.send(createdPayroll);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id: payrollId } = req.params;
    const singlePayroll = await Payroll.findByPk(payrollId);

    res.send(singlePayroll.dataValues);
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    console.log(req.params);

    const { id } = req.params;

    //if you want to use the payroll object in the future you can do a findByPk for payroll and save it into a variable before destroying it instead

    const payrollToDelete = await Payroll.destroy({ where: { id } });

    res.send("payroll was deleted");
  } catch (err) {
    next(err);
  }
});

router.put("/update/:id", async (req, res, next) => {
  try {
    const {
      id,
      month,
      week,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      totalPay,
    } = req.body;

    const payrollToUpdate = await Payroll.findByPk(id);

    const updatedPayroll = await payrollToUpdate.update({
      month,
      week,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      totalPay,
    });

    res.send(updatedPayroll.dataValues);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
