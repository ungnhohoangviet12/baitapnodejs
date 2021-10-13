const httpStatus = require('http-status');
const { Car } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a car
 * @param {Object} carBody
 * @returns {Promise<Car>}
 */
const createCar = async (carBody) => {
  
  return Car.create(carBody);
};

/**
 * Query for cars
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCars = async (filter, options) => {
  const cars = await Car.paginate(filter, options);
  return cars;
};

/**
 * Get car by id
 * @param {ObjectId} id
 * @returns {Promise<Car>}
 */
const getCarById = async (id) => {
  return Car.findById(id);
};

/**
 * Get car by email
 * @param {string} email
 * @returns {Promise<Car>}
 */
const getCarByEmail = async (email) => {
  return Car.findOne({ email });
};

/**
 * Update car by id
 * @param {ObjectId} carId
 * @param {Object} updateBody
 * @returns {Promise<Car>}
 */
const updateCarById = async (carId, updateBody) => {
  const car = await getCarById(carId);
  if (!car) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Car not found');
  }
  if (updateBody.email && (await Car.isEmailTaken(updateBody.email, carId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(car, updateBody);
  await car.save();
  return car;
};

/**
 * Delete car by id
 * @param {ObjectId} carId
 * @returns {Promise<Car>}
 */
const deleteCarById = async (carId) => {
  const car = await getCarById(carId);
  if (!car) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Car not found');
  }
  await car.remove();
  return car;
};

module.exports = {
  createCar,
  queryCars,
  getCarById,
  getCarByEmail,
  updateCarById,
  deleteCarById,
};
