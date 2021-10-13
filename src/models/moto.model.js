const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const motoSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
   
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
motoSchema.plugin(toJSON);
motoSchema.plugin(paginate);



/**
 * @typedef Moto
 */
const Moto = mongoose.model('Moto', motoSchema);

module.exports = Moto;
