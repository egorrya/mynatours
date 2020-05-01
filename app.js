const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes.js");
const userRouter = require("./routes/userRoutes.js");

const app = express();

// Middlewares
app.use(morgan("dev"));
console.log();
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
