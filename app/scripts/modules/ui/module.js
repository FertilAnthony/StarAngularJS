'use strict';

module.exports = angular
  .module('boilerplate.ui', [
    'boilerplate.common',
    'boilerplate.data',
    'ui.bootstrap',
    'ui.router'
  ])
  .config(require('./config/routing'))
  .controller('HomeController', require('./controllers/home'))
  .controller('BikeStationDetailController', require('./controllers/bikeStationDetail'))
  .directive('customLoader', require('./directive/customLoader'))
  .directive('paginator', require('./directive/paginator'))
;
