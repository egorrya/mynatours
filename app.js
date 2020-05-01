const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(morgan("dev"));
console.log();
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route handlers

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.lenght,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.lenght) {
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params * 1 > tours.lenght) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "updated tour",
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params * 1 > tours.lenght) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "success",
    message: "This route not yet defined",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "success",
    message: "This route not yet defined",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "success",
    message: "This route not yet defined",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "success",
    message: "This route not yet defined",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "success",
    message: "This route not yet defined",
  });
};

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route("/api/v1/users").get(getAllUsers).post(createUser);

app
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// Start server

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
