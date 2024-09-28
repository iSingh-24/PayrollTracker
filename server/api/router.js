const router = require("express").Router();
const employeeRouter = require("./employeeRoutes");

router.use("/employees", employeeRouter);
module.exports = router;
