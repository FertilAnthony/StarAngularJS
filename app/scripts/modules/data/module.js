'use strict';

module.exports = angular
  .module('boilerplate.data', [
    'boilerplate.common'
  ])
  .factory('Stations', require('./service/velibStations'))
  .constant('OpenDataApi', require('./constant/api'))
  .factory('BusStations', require('./service/busStations'))
  .constant('OpenBusDataApi', require('./constant/apiBus'))
;
