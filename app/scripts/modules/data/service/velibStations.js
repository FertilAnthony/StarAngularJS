'use strict';

/**
 * @ngInject
 */
function StationsService($http, $log, OpenDataApi) {
  // Interface
  var service = {
    get: get,
    getById: getById
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
    var promise = $http(apiArgs);
    promise.then(function onSuccess(response) {
      $log.log(response);
    });
    return promise;
  }

  function getById(idStation) {
    var apiArgs = {
      url: OpenDataApi.url,
      method: 'GET',
      params: {
        version: OpenDataApi.version,
        key: OpenDataApi.key,
        cmd: 'getbikestations', // A modifier pour les bus après
        param: {
          request: 'number',
          value: idStation
        }
      }
    };
    // TODO: Appel au web service en utilisant le service angular $http
    var promise = $http(apiArgs);
    promise.then(function onSuccess(response) {
      $log.log(response);
    });
    return promise;
  }
}

module.exports = StationsService;