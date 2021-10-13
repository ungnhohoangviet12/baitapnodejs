const httpStatus = require('http-status');
const { Appare } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a appare
 * @param {Object} appareBody
 * @returns {Promise<Appare>}
 */
const createAppare = async (appareBody) => {
  
  return Appare.create(appareBody);
};

/**
 * Query for appares
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAppares = async (filter, options) => {
  const appares = await Appare.paginate(filter, options);
  return appares;
};

/**
 * Get appare by id
 * @param {ObjectId} id
 * @returns {Promise<Appare>}
 */
const getAppareById = async (id) => {
  return Appare.findById(id);
};

/**
 * Get appare by email
 * @param {string} email
 * @returns {Promise<Appare>}
 */
const getAppareByEmail = async (email) => {
  return Appare.findOne({ email });
};

/**
 * Update appare by id
 * @param {ObjectId} appareId
 * @param {Object} updateBody
 * @returns {Promise<Appare>}
 */
const updateAppareById = async (appareId, updateBody) => {
  const appare = await getAppareById(appareId);
  if (!appare) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Appare not found');
  }
  if (updateBody.email && (await Appare.isEmailTaken(updateBody.email, appareId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(appare, updateBody);
  await appare.save();
  return appare;
};

/**
 * Delete appare by id
 * @param {ObjectId} appareId
 * @returns {Promise<Appare>}
 */
const deleteAppareById = async (appareId) => {
  const appare = await getAppareById(appareId);
  if (!appare) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Appare not found');
  }
  await appare.remove();
  return appare;
};

module.exports = {
  createAppare,
  queryAppares,
  getAppareById,
  getAppareByEmail,
  updateAppareById,
  deleteAppareById,
};
