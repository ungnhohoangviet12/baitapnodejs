const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { appareService } = require('../services');

const createAppare = catchAsync(async (req, res) => {
  const appare = await appareService.createAppare(req.body);
  res.status(httpStatus.CREATED).send(appare);
});

const getAppares = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await appareService.queryAppares(filter, options);
  res.send(result);
});

const getAppare = catchAsync(async (req, res) => {
  const appare = await appareService.getAppareById(req.params.appareId);
  if (!appare) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Appare not found');
  }
  res.send(appare);
});

const updateAppare = catchAsync(async (req, res) => {
  const appare = await appareService.updateAppareById(req.params.appareId, req.body);
  res.send(appare);
});

const deleteAppare = catchAsync(async (req, res) => {
  await appareService.deleteAppareById(req.params.appareId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAppare,
  getAppares,
  getAppare,
  updateAppare,
  deleteAppare,
};
