'use strict';

module.exports = angular
  .module('boilerplate.common', [])
  .factory('Tracer', require('./factory/tracer'))
  .config(function($provide, $httpProvider) {
    $provide.factory('Loader', require('./factory/loader'));
    $httpProvider.interceptors.push('Loader');
  })
;
