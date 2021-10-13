const httpStatus = require('http-status');
const { Moto } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a moto
 * @param {Object} motoBody
 * @returns {Promise<Moto>}
 */
const createMoto = async (motoBody) => {
  
  return Moto.create(motoBody);
};

/**
 * Query for motos
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMotos = async (filter, options) => {
  const motos = await Moto.paginate(filter, options);
  return motos;
};

/**
 * Get moto by id
 * @param {ObjectId} id
 * @returns {Promise<Moto>}
 */
const getMotoById = async (id) => {
  return Moto.findById(id);
};

/**
 * Get moto by email
 * @param {string} email
 * @returns {Promise<Moto>}
 */
const getMotoByEmail = async (email) => {
  return Moto.findOne({ email });
};

/**
 * Update moto by id
 * @param {ObjectId} motoId
 * @param {Object} updateBody
 * @returns {Promise<Moto>}
 */
const updateMotoById = async (motoId, updateBody) => {
  const moto = await getMotoById(motoId);
  if (!moto) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Moto not found');
  }
  if (updateBody.email && (await Moto.isEmailTaken(updateBody.email, motoId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(moto, updateBody);
  await moto.save();
  return moto;
};

/**
 * Delete moto by id
 * @param {ObjectId} motoId
 * @returns {Promise<Moto>}
 */
const deleteMotoById = async (motoId) => {
  const moto = await getMotoById(motoId);
  if (!moto) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Moto not found');
  }
  await moto.remove();
  return moto;
};

module.exports = {
  createMoto,
  queryMotos,
  getMotoById,
  getMotoByEmail,
  updateMotoById,
  deleteMotoById,
};
