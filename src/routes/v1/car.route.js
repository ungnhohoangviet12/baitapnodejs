const express = require('express');
const carController = require('../../controllers/car.controller');

const router = express.Router();

router
  .route('/')
  .post(carController.createCar)
  .get(carController.getCars);

router
  .route('/:carId')
  .get(carController.getCar)
  .patch(carController.updateCar)
  .delete(carController.deleteCar);

module.exports = router;

