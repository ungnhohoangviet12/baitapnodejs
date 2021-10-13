const express = require('express');
const appareController = require('../../controllers/appare.controller');

const router = express.Router();

router
  .route('/')
  .post(appareController.createAppare)
  .get(appareController.getAppares);

router
  .route('/:appareId')
  .get(appareController.getAppare)
  .patch(appareController.updateAppare)
  .delete(appareController.deleteAppare);

module.exports = router;

