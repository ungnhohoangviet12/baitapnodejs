const express = require('express');
const motoController = require('../../controllers/moto.controller');

const router = express.Router();

router
  .route('/')
  .post(motoController.createMoto)
  .get(motoController.getMotos);

router
  .route('/:motoId')
  .get(motoController.getMoto)
  .patch(motoController.updateMoto)
  .delete(motoController.deleteMoto);

module.exports = router;

