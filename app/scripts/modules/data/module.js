'use strict';

module.exports = angular
  .module('boilerplate.data', [
    'boilerplate.common'
  ])
  .factory('Stations', require('./service/velibStations'))
  .constant('OpenDataApi', require('./constant/api'))
;
