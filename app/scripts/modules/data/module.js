'use strict';

module.exports = angular
  .module('boilerplate.data', [
    'boilerplate.common'
  ])
  .factory('Stations', require('./service/velibStations'))
  .constant('OpenDataApi', require('./constant/api'))
  .factory('BusLines', require('./service/busLines'))
  .constant('OpenBusDataApi', require('./constant/apiBus'))
;
