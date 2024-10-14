const router = require("express").Router();
const employeeRouter = require("./employeeRoutes");
const payrollRouter = require("./payrollRoutes");

router.use("/employees", employeeRouter);
router.use("/payroll", payrollRouter);
module.exports = router;
