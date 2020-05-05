const express = require("express");
const tourController = require("./../controllers/tourController");

const router = express.Router();

router
  .route("/top-5-and-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route("/stats")
  .get(tourController.getTourStats, tourController.getAllTours);

router
  .route("/monthly-plan/:year")
  .get(tourController.getMonthlyPlan, tourController.getAllTours);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
