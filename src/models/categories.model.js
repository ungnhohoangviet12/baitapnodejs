const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const categoriesSchema = mongoose.Schema(
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
categoriesSchema.plugin(toJSON);
categoriesSchema.plugin(paginate);



/**
 * @typedef Categories
 */
const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;
