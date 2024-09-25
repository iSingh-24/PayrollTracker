/**TODO
 *
 * 1) Find a way to test if this express.urlencoded is working properly
 */

const path = require("path");
const express = require("express");
const morgan = require("morgan");
// const apiRoutes = require("./api/router");

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "dist")));

app.use(express.urlencoded({ extended: false })); //this will parse url encoded data

app.use(express.json()); //call the function so that it parses any json data that we may receieve from req.body in the routes

app.use(morgan("dev"));

// app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "dist", "index.html"));
}); //see if there's a better way then this or how did we used to do this before with router?

// Error hander
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({ error: err.message });
});

// Handle 404
app.use((req, res) => {
  res.status(404).send("<h1> Page not found</h1>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
