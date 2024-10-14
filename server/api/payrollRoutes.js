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

module.exports = router;
