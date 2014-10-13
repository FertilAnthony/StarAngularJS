'use strict';

/**
 * @ngInject
 */
function Loader($q, $rootScope) {
  // Interface
  var service = {
    get: get
  };
  return service;

  // Implentation

  function get() {

  	var currentRequestsCount = 0;
    return {
        //Everytime a request starts, the loader is displayed
        request: function(config) {
            currentRequestsCount++;
            $rootScope.$emit('loaderShow');
            return config || $q.when(config);
        },
        //When a request ends, and if there is no request still running, the loader is hidden
        response: function(response) {
            if ((--currentRequestsCount) === 0) {
                $rootScope.$emit('loaderHide');
            }
            return response || $q.when(response);
        },
        //When a request fails, and if there is no request still running, the loader is hidden
        responseError: function(response) {
            if (!(--currentRequestsCount)) {
                $rootScope.$emit('loaderHide');
            }
            return $q.reject(response);
        }
    };

  }
}

module.exports = Loader;
