const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { motoService } = require('../services');

const createMoto = catchAsync(async (req, res) => {
  const moto = await motoService.createMoto(req.body);
  res.status(httpStatus.CREATED).send(moto);
});

const getMotos = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await motoService.queryMotos(filter, options);
  res.send(result);
});

const getMoto = catchAsync(async (req, res) => {
  const moto = await motoService.getMotoById(req.params.motoId);
  if (!moto) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Moto not found');
  }
  res.send(moto);
});

const updateMoto = catchAsync(async (req, res) => {
  const moto = await motoService.updateMotoById(req.params.motoId, req.body);
  res.send(moto);
});

const deleteMoto = catchAsync(async (req, res) => {
  await motoService.deleteMotoById(req.params.motoId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMoto,
  getMotos,
  getMoto,
  updateMoto,
  deleteMoto,
};
