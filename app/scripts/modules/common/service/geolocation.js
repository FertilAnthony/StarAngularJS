'use strict';

/**
 * @ngInject
 */
function GeolocationService($q, $window) {

  this.getCurrentPosition = function getCurrentPosition() {
    var deferred = $q.defer();

    $window.navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject);

    return deferred.promise;
  };
}

module.exports = GeolocationService;