const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const appareSchema = mongoose.Schema(
  {
  
    sizecode: {
      type: Number,
      required: true,
      trim: true,
    },
    sortorder: {
      type: Number,
      required: true,
      trim: true,
    },
   
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
appareSchema.plugin(toJSON);
appareSchema.plugin(paginate);



/**
 * @typedef Appare
 */
const Appare = mongoose.model('Appare', appareSchema);

module.exports = Appare;
