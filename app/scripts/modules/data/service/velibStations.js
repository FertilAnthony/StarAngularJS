'use strict';

/**
 * @ngInject
 */
function StationsService($http, $log, OpenDataApi) {
  // Interface
  var service = {
    get: get
  };
  return service;

  // Implementation

  function get() {
    var apiArgs = {
      url: OpenDataApi.url,
      method: 'GET',
      params: {
        version: OpenDataApi.version,
        key: OpenDataApi.key,
        cmd: 'getbikestations' // A modifier pour les bus après
      }
    };
    // TODO: Appel au web service en utilisant le service angular $http
    return $http(apiArgs);
  }
}

module.exports = StationsService;