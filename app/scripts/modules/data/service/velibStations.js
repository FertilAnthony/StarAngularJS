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
        cmd: OpenDataApi.cmd
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
    var parameter = '?param[station]=number&param[value]=' + idStation

    var apiArgs = {
      url: OpenDataApi.url + parameter,
      method: 'GET',
      params: {
        version: OpenDataApi.version,
        key: OpenDataApi.key,
        cmd: OpenDataApi.cmd
      },
      param: {
        station: 'number',
        value: idStation
      }
    };
    $log.log(apiArgs);
    // TODO: Appel au web service en utilisant le service angular $http
    var promise = $http(apiArgs);
    promise.then(function onSuccess(response) {
      $log.log(response);
    });
    return promise;
  }
}

module.exports = StationsService;