const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const lopRoute = require('./lop.route');
const sinhvienRoute = require('./sinhvien.route');
const appareRoute = require('./appare.route');
const productRoute = require('./product.route');
const categoriesRoute = require('./categories.route');
const motoRoute = require('./moto.route');
const carRoute = require('./car.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/lops',
    route: lopRoute,
  },
  {
    path: '/sinhviens',
    route: sinhvienRoute,
  },
  {
    path: '/appares',
    route: appareRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/categoriess',
    route: categoriesRoute,
  },
  {
    path: '/motos',
    route: motoRoute,
  },
  {
    path: '/cars',
    route: carRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
