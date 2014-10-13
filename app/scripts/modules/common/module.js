'use strict';

module.exports = angular
  .module('boilerplate.common', [])
  .factory('Tracer', require('./factory/tracer'))
  .factory('Loader', require('./factory/loader'))
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('Loader');
  }])
;
