(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Require application modules
require('./modules/common/module');
require('./modules/data/module');
require('./modules/ui/module');

},{"./modules/common/module":4,"./modules/data/module":8,"./modules/ui/module":17}],2:[function(require,module,exports){
'use strict';

/**
 * @ngInject
 */
function Loader($q, $rootScope) {

	var currentRequestsCount = 0;

  return {
      //Everytime a request starts, the loader is displayed
      request: function(config) {
          currentRequestsCount++;
          $rootScope.$broadcast('loaderShow');
          return config || $q.when(config);
      },
      //When a request ends, and if there is no request still running, the loader is hidden
      response: function(response) {
          if ((--currentRequestsCount) === 0) {
              $rootScope.$broadcast('loaderHide');
          }
          return response || $q.when(response);
      },
      //When a request fails, and if there is no request still running, the loader is hidden
      responseError: function(response) {
          if (!(--currentRequestsCount)) {
              $rootScope.$broadcast('loaderHide');
          }
          return $q.reject(response);
      }
  };

}
Loader.$inject = ['$q', '$rootScope'];

module.exports = Loader;

},{}],3:[function(require,module,exports){
'use strict';

/**
 * @ngInject
 */
function Tracer($log) {
  // Interface
  var service = {
    trace: trace
  };
  return service;

  // Implentation

  function trace(caller) {
    $log.log(caller.name);
  }
}
Tracer.$inject = ['$log'];

module.exports = Tracer;

},{}],4:[function(require,module,exports){
'use strict';

module.exports = angular
  .module('boilerplate.common', [])
  .factory('Tracer', require('./factory/tracer'))
  .config(['$provide', '$httpProvider', function($provide, $httpProvider) {
    $provide.factory('Loader', require('./factory/loader'));
    $httpProvider.interceptors.push('Loader');
  }])
  .service('Geolocation', require('./service/geolocation'))
;

},{"./factory/loader":2,"./factory/tracer":3,"./service/geolocation":5}],5:[function(require,module,exports){
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
GeolocationService.$inject = ['$q', '$window'];

module.exports = GeolocationService;
},{}],6:[function(require,module,exports){
'use strict';

module.exports = {
  url: 'http://data.keolis-rennes.com/json/',
  version: '2.0',
  key: '1RETTIB4XU1C07V',
  cmd: 'getbikestations'
};
},{}],7:[function(require,module,exports){
'use strict';

module.exports = {
  url: 'http://data.keolis-rennes.com/json/',
  version: '2.0',
  key: '1RETTIB4XU1C07V',
  cmd: 'getlines'
};
},{}],8:[function(require,module,exports){
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

},{"./constant/api":6,"./constant/apiBus":7,"./service/busLines":9,"./service/velibStations":10}],9:[function(require,module,exports){
'use strict';

/**
 * @ngInject
 */
function BusLinesService($http, $log, OpenBusDataApi) {
  // Interface
  var service = {
    get: get,
    getById: getById
  };
  return service;

  // Implementation

  function get() {
    var apiArgs = {
      url: OpenBusDataApi.url,
      method: 'GET',
      params: {
        version: OpenBusDataApi.version,
        key: OpenBusDataApi.key,
        cmd: OpenBusDataApi.cmd
      }
    };
    // TODO: Appel au web service en utilisant le service angular $http
    var promise = $http(apiArgs);
    promise.then(function onSuccess(response) {
      $log.log(response);
    });
    return promise;
  }

  function getById(idLine) {
    /*var parameter = '?param[station]=number&param[value]=' + idStation;

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

    // TODO: Appel au web service en utilisant le service angular $http
    var promise = $http(apiArgs);
    promise.then(function onSuccess(response) {
      $log.log(response);
    });
    return promise;*/
  }
}
BusLinesService.$inject = ['$http', '$log', 'OpenBusDataApi'];

module.exports = BusLinesService;
},{}],10:[function(require,module,exports){
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
    var parameter = '?param[station]=number&param[value]=' + idStation;

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

    // TODO: Appel au web service en utilisant le service angular $http
    var promise = $http(apiArgs);
    promise.then(function onSuccess(response) {
      $log.log(response);
    });
    return promise;
  }
}
StationsService.$inject = ['$http', '$log', 'OpenDataApi'];

module.exports = StationsService;
},{}],11:[function(require,module,exports){
'use strict';

/**
 * @ngInject
 */
function RoutingConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  // Configuration des routes de l'application
  $urlRouterProvider.otherwise('/accueil');

  // Configuration des états
  $stateProvider
  	.state('accueil', {
	  	url: '/accueil',
	  	templateUrl: '/views/accueil.html'
	  })
    .state('velib-stations', {
      url: '/velib-stations',
      templateUrl: '/views/velib_stations.html',
      controller: 'VelibController as vm'
    })
  	.state('detail-velib-station', {
  		url: '/velib-stations/detail/:id',
  		templateUrl: '/views/detail_station.html',
  		controller: 'BikeStationDetailController as vm'
  	})
    .state('bus-lines', {
      url: '/bus-lines',
      templateUrl: '/views/bus_lines.html',
      controller: 'BusLinesController as vm'
    })
  ;

  // Configuration du push state
  $locationProvider.html5Mode(true);
}
RoutingConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

module.exports = RoutingConfig;
},{}],12:[function(require,module,exports){
'use strict';

/**
 * @ngInject
 */
function BikeStationDetailController(Stations, $scope, $stateParams, $log, $timeout, Geolocation) {
	// ViewModel
	// var vm = this;

	$scope.detailStation = {};
	$scope.showLoader = true;
	$scope.show = false;
	$scope.showInstructions = false;
	$scope.map = {};
	$scope.markers = [];
	$scope.instructions = [];
	$scope.distance = 0;
	$scope.options = {
	    zoom: 15,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	Stations.getById($stateParams.id).then(function onSuccess(response) {
		var detailStation = response.data.opendata.answer.data.station,
			totalBikes = parseInt(detailStation.slotsavailable, 10) + parseInt(detailStation.bikesavailable, 10),
			percentBikes = detailStation.bikesavailable/totalBikes,
			percentPlaces = detailStation.slotsavailable/totalBikes,
			typeBikes,
			typePlaces,
			destination = new google.maps.LatLng(detailStation.latitude, detailStation.longitude);

		//vm.stations = stations;
		$scope.detailStation = detailStation;

		$scope.map.panTo(destination);
		$scope.destination = destination;
		$scope.markers.push(new google.maps.Marker({
		    map: $scope.map,
		    position: destination,
		    icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png'
		}));

		var directionsDisplay = new google.maps.DirectionsRenderer();
        //this is where we pass our the map object to the directionsDisplay.setMap method
        directionsDisplay.setMap($scope.map);
        google.maps.event.trigger($scope.map, 'resize');

        // HTML5 geolocalize
        $scope.geolocalize = function() {
		    Geolocation.getCurrentPosition().then(function onGetCurrentPosition(geoposition) {
		      	var coords = geoposition.coords;
		      	// Set itineraire
		    	findPath(coords);
		    });
		}

        function findPath(coords) {
            //using the direction service of google map api
            $scope.directionsService = new google.maps.DirectionsService();
            $scope.markers.splice(0, 1);

            $log.log($scope);

            var request = {
                origin: new google.maps.LatLng(coords.latitude, coords.longitude),
                destination: $scope.destination,
                travelMode: google.maps.DirectionsTravelMode.WALKING
            };
            //call the route method on google map api direction service with the request
            //which returns a response which can be directly provided to
            //directiondisplay object to display the route returned on the map
            $scope.directionsService.route(request, function(response, status) {
            	var instructions = [];
                if (status == google.maps.DirectionsStatus.OK) {
                	instructions = response.routes[0].legs[0].steps;
                    console.log(response);
                    directionsDisplay.setDirections(response);
                    console.log(response.routes.length);
                    $scope.distance = response.routes[0].legs[0].distance.value / 1000;
                    // Récupération des instructions
                    instructions = instructions.map(function(instruction) {
                    	return {
                    		duration: instruction.duration['text'],
                    		distance: instruction.distance['text'],
                    		instruction: instruction.instructions
                    	}
                    });
                    $log.log(instructions);
                    $scope.instructions = instructions;
                    $scope.distanceTotal = response.routes[0].legs[0].distance['text'];
                    $scope.tempsTotal = response.routes[0].legs[0].duration['text'];
                    $scope.showInstructions = true;
                }
            });
        }

		// Define progressBar
		setProgressBar(percentBikes, percentPlaces, typeBikes, typePlaces);
		$scope.max = totalBikes;

		$log.log($scope);
		$log.log(detailStation);

	});


	function setProgressBar(percentBikes, percentPlaces, typeBikes, typePlaces) {

		if (percentBikes < 0.25) {
			typeBikes = 'danger';
		} else if (percentBikes < 0.5) {
			typeBikes = 'warning';
		} else {
			typeBikes = 'success';
		}

		if (percentPlaces < 0.25) {
			typePlaces = 'danger';
		} else if (percentPlaces < 0.5) {
			typePlaces = 'warning';
		} else {
			typePlaces = 'success';
		}

		$scope.typeBikes = typeBikes;
		$scope.typePlaces = typePlaces;

		$timeout(function(){
		    $scope.show = true;
		}, 200);
	}

}
BikeStationDetailController.$inject = ['Stations', '$scope', '$stateParams', '$log', '$timeout', 'Geolocation'];

module.exports = BikeStationDetailController;

},{}],13:[function(require,module,exports){
'use strict';

/**
 * @ngInject
 */
function BusLinesController(BusLines, $log, $scope) {
	// ViewModel
	// var vm = this;
	
	//vm.stations = [];
	$scope.lines = [];
	$scope.showLoader = true;

	BusLines.get().then(function onSuccess(response) {
		var lines = response.data.opendata.answer.data.line;
		//vm.stations = stations;
		$scope.lines = lines;
		$scope.baseUrl = response.data.opendata.answer.data.baseurl;
		$log.log(lines);
	});

}
BusLinesController.$inject = ['BusLines', '$log', '$scope'];

module.exports = BusLinesController;

},{}],14:[function(require,module,exports){
'use strict';

/**
 * @ngInject
 */
function VelibController(Stations, $log, $scope) {
	// ViewModel
	// var vm = this;
	
	//vm.stations = [];
	$scope.stations = [];
	$scope.showLoader = true;

	Stations.get().then(function onSuccess(response) {
		var stations = response.data.opendata.answer.data.station;
		//vm.stations = stations;
		$scope.stations = stations;
		$log.log(stations);
	});

}
VelibController.$inject = ['Stations', '$log', '$scope'];

module.exports = VelibController;

},{}],15:[function(require,module,exports){
'use strict';

/**
 * @ngInject
 */
function customLoader() {

	return {
		restrict: 'E', // Element
		template: 
		'<div id="loaderDiv" class="customLoader" ng-show="showLoader">' +
          '<img src="http://preloaders.net/preloaders/166/Pacman.gif" class="ajax-loader"/>' +
        '</div>',
        link:
		function ($scope, $element) {
	        $scope.$on('loaderShow', function () {
	            $scope.showLoader = true;
	            return $element;
	        });
	        $scope.$on('loaderHide', function () {
	            $scope.showLoader = false;
	            return $element;
	        });
    	}
    };

}

module.exports = customLoader;

},{}],16:[function(require,module,exports){
'use strict';

/**
 * @ngInject
 */
function paginator() {

	return {
		restrict: 'A', // Attribut
		scope: {items: '&'},
		templateUrl: '/views/directives/paginator.html',
	    replace: false,
	    compile: function compile() {
	      return {
	        pre: function preLink(scope) {
	          scope.pageSizeList = [9, 18, 45, 100];
	          scope.paginator = {
	            pageSize: 9,
	            currentPage: 0
	          };

	          scope.totalItems = function () {
	          	return scope.items().length;
	          };
	          scope.isFirstPage = function () {
	            return scope.paginator.currentPage === 0;
	          };
	          scope.isLastPage = function () {
	            return scope.paginator.currentPage >= scope.numberOfPages() - 1;
	          };
	          scope.incPage = function () {
	            if (!scope.isLastPage()) {
	              scope.paginator.currentPage++;
	            }
	          };
	          scope.decPage = function () {
	            if (!scope.isFirstPage()) {
	              scope.paginator.currentPage--;
	            }
	          };
	          scope.firstPage = function () {
	            scope.paginator.currentPage = 0;
	          };
	          scope.lastPage = function () {
	          	scope.paginator.currentPage = scope.numberOfPages() - 1;
	          };
	          scope.numberOfPages = function () {
	            return Math.ceil(scope.totalItems() / scope.paginator.pageSize);
	          };
	          scope.$watch('paginator.pageSize', function(newValue, oldValue) {
	            if (newValue !== oldValue) {
	              scope.firstPage();
	            }
	          });

	          // ---- Functions available in parent scope -----

	          scope.$parent.firstPage = function () {
	            scope.firstPage();
	          };
	          // Function that returns the reduced items list, to use in ng-repeat
	          scope.$parent.pageItems = function () {
	            var start = scope.paginator.currentPage * scope.paginator.pageSize;
	            var limit = scope.paginator.pageSize;
	            return scope.items().slice(start, start + limit);
	          };
	        },
	        post: function postLink() {}
	      };
	    }
	};

}

module.exports = paginator;
},{}],17:[function(require,module,exports){
'use strict';

module.exports = angular
  .module('boilerplate.ui', [
    'boilerplate.common',
    'boilerplate.data',
    'ui.bootstrap',
    'ui.router',
    'ui.map',
    'ngSanitize'
  ])
  .config(require('./config/routing'))
  .controller('VelibController', require('./controllers/velibStations'))
  .controller('BikeStationDetailController', require('./controllers/bikeStationDetail'))
  .directive('customLoader', require('./directive/customLoader'))
  .directive('paginator', require('./directive/paginator'))
  .controller('BusLinesController', require('./controllers/busLines'))
;

},{"./config/routing":11,"./controllers/bikeStationDetail":12,"./controllers/busLines":13,"./controllers/velibStations":14,"./directive/customLoader":15,"./directive/paginator":16}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiYXBwXFxzY3JpcHRzXFxtYWluLmpzIiwiYXBwXFxzY3JpcHRzXFxtb2R1bGVzXFxjb21tb25cXGZhY3RvcnlcXGxvYWRlci5qcyIsImFwcFxcc2NyaXB0c1xcbW9kdWxlc1xcY29tbW9uXFxmYWN0b3J5XFx0cmFjZXIuanMiLCJhcHBcXHNjcmlwdHNcXG1vZHVsZXNcXGNvbW1vblxcbW9kdWxlLmpzIiwiYXBwXFxzY3JpcHRzXFxtb2R1bGVzXFxjb21tb25cXHNlcnZpY2VcXGdlb2xvY2F0aW9uLmpzIiwiYXBwXFxzY3JpcHRzXFxtb2R1bGVzXFxkYXRhXFxjb25zdGFudFxcYXBpLmpzIiwiYXBwXFxzY3JpcHRzXFxtb2R1bGVzXFxkYXRhXFxjb25zdGFudFxcYXBpQnVzLmpzIiwiYXBwXFxzY3JpcHRzXFxtb2R1bGVzXFxkYXRhXFxtb2R1bGUuanMiLCJhcHBcXHNjcmlwdHNcXG1vZHVsZXNcXGRhdGFcXHNlcnZpY2VcXGJ1c0xpbmVzLmpzIiwiYXBwXFxzY3JpcHRzXFxtb2R1bGVzXFxkYXRhXFxzZXJ2aWNlXFx2ZWxpYlN0YXRpb25zLmpzIiwiYXBwXFxzY3JpcHRzXFxtb2R1bGVzXFx1aVxcY29uZmlnXFxyb3V0aW5nLmpzIiwiYXBwXFxzY3JpcHRzXFxtb2R1bGVzXFx1aVxcY29udHJvbGxlcnNcXGJpa2VTdGF0aW9uRGV0YWlsLmpzIiwiYXBwXFxzY3JpcHRzXFxtb2R1bGVzXFx1aVxcY29udHJvbGxlcnNcXGJ1c0xpbmVzLmpzIiwiYXBwXFxzY3JpcHRzXFxtb2R1bGVzXFx1aVxcY29udHJvbGxlcnNcXHZlbGliU3RhdGlvbnMuanMiLCJhcHBcXHNjcmlwdHNcXG1vZHVsZXNcXHVpXFxkaXJlY3RpdmVcXGN1c3RvbUxvYWRlci5qcyIsImFwcFxcc2NyaXB0c1xcbW9kdWxlc1xcdWlcXGRpcmVjdGl2ZVxccGFnaW5hdG9yLmpzIiwiYXBwXFxzY3JpcHRzXFxtb2R1bGVzXFx1aVxcbW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBSZXF1aXJlIGFwcGxpY2F0aW9uIG1vZHVsZXNcclxucmVxdWlyZSgnLi9tb2R1bGVzL2NvbW1vbi9tb2R1bGUnKTtcclxucmVxdWlyZSgnLi9tb2R1bGVzL2RhdGEvbW9kdWxlJyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy91aS9tb2R1bGUnKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIEBuZ0luamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gTG9hZGVyKCRxLCAkcm9vdFNjb3BlKSB7XHJcblxyXG5cdHZhciBjdXJyZW50UmVxdWVzdHNDb3VudCA9IDA7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAgIC8vRXZlcnl0aW1lIGEgcmVxdWVzdCBzdGFydHMsIHRoZSBsb2FkZXIgaXMgZGlzcGxheWVkXHJcbiAgICAgIHJlcXVlc3Q6IGZ1bmN0aW9uKGNvbmZpZykge1xyXG4gICAgICAgICAgY3VycmVudFJlcXVlc3RzQ291bnQrKztcclxuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnbG9hZGVyU2hvdycpO1xyXG4gICAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIC8vV2hlbiBhIHJlcXVlc3QgZW5kcywgYW5kIGlmIHRoZXJlIGlzIG5vIHJlcXVlc3Qgc3RpbGwgcnVubmluZywgdGhlIGxvYWRlciBpcyBoaWRkZW5cclxuICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICBpZiAoKC0tY3VycmVudFJlcXVlc3RzQ291bnQpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdsb2FkZXJIaWRlJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UgfHwgJHEud2hlbihyZXNwb25zZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIC8vV2hlbiBhIHJlcXVlc3QgZmFpbHMsIGFuZCBpZiB0aGVyZSBpcyBubyByZXF1ZXN0IHN0aWxsIHJ1bm5pbmcsIHRoZSBsb2FkZXIgaXMgaGlkZGVuXHJcbiAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICBpZiAoISgtLWN1cnJlbnRSZXF1ZXN0c0NvdW50KSkge1xyXG4gICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnbG9hZGVySGlkZScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSk7XHJcbiAgICAgIH1cclxuICB9O1xyXG5cclxufVxyXG5Mb2FkZXIuJGluamVjdCA9IFsnJHEnLCAnJHJvb3RTY29wZSddO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBAbmdJbmplY3RcclxuICovXHJcbmZ1bmN0aW9uIFRyYWNlcigkbG9nKSB7XHJcbiAgLy8gSW50ZXJmYWNlXHJcbiAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICB0cmFjZTogdHJhY2VcclxuICB9O1xyXG4gIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAvLyBJbXBsZW50YXRpb25cclxuXHJcbiAgZnVuY3Rpb24gdHJhY2UoY2FsbGVyKSB7XHJcbiAgICAkbG9nLmxvZyhjYWxsZXIubmFtZSk7XHJcbiAgfVxyXG59XHJcblRyYWNlci4kaW5qZWN0ID0gWyckbG9nJ107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWNlcjtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyXHJcbiAgLm1vZHVsZSgnYm9pbGVycGxhdGUuY29tbW9uJywgW10pXHJcbiAgLmZhY3RvcnkoJ1RyYWNlcicsIHJlcXVpcmUoJy4vZmFjdG9yeS90cmFjZXInKSlcclxuICAuY29uZmlnKFsnJHByb3ZpZGUnLCAnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uKCRwcm92aWRlLCAkaHR0cFByb3ZpZGVyKSB7XHJcbiAgICAkcHJvdmlkZS5mYWN0b3J5KCdMb2FkZXInLCByZXF1aXJlKCcuL2ZhY3RvcnkvbG9hZGVyJykpO1xyXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnTG9hZGVyJyk7XHJcbiAgfV0pXHJcbiAgLnNlcnZpY2UoJ0dlb2xvY2F0aW9uJywgcmVxdWlyZSgnLi9zZXJ2aWNlL2dlb2xvY2F0aW9uJykpXHJcbjtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIEBuZ0luamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gR2VvbG9jYXRpb25TZXJ2aWNlKCRxLCAkd2luZG93KSB7XHJcblxyXG4gIHRoaXMuZ2V0Q3VycmVudFBvc2l0aW9uID0gZnVuY3Rpb24gZ2V0Q3VycmVudFBvc2l0aW9uKCkge1xyXG4gICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAkd2luZG93Lm5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZGVmZXJyZWQucmVzb2x2ZSwgZGVmZXJyZWQucmVqZWN0KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICB9O1xyXG59XHJcbkdlb2xvY2F0aW9uU2VydmljZS4kaW5qZWN0ID0gWyckcScsICckd2luZG93J107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdlb2xvY2F0aW9uU2VydmljZTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICB1cmw6ICdodHRwOi8vZGF0YS5rZW9saXMtcmVubmVzLmNvbS9qc29uLycsXHJcbiAgdmVyc2lvbjogJzIuMCcsXHJcbiAga2V5OiAnMVJFVFRJQjRYVTFDMDdWJyxcclxuICBjbWQ6ICdnZXRiaWtlc3RhdGlvbnMnXHJcbn07IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgdXJsOiAnaHR0cDovL2RhdGEua2VvbGlzLXJlbm5lcy5jb20vanNvbi8nLFxyXG4gIHZlcnNpb246ICcyLjAnLFxyXG4gIGtleTogJzFSRVRUSUI0WFUxQzA3VicsXHJcbiAgY21kOiAnZ2V0bGluZXMnXHJcbn07IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyXHJcbiAgLm1vZHVsZSgnYm9pbGVycGxhdGUuZGF0YScsIFtcclxuICAgICdib2lsZXJwbGF0ZS5jb21tb24nXHJcbiAgXSlcclxuICAuZmFjdG9yeSgnU3RhdGlvbnMnLCByZXF1aXJlKCcuL3NlcnZpY2UvdmVsaWJTdGF0aW9ucycpKVxyXG4gIC5jb25zdGFudCgnT3BlbkRhdGFBcGknLCByZXF1aXJlKCcuL2NvbnN0YW50L2FwaScpKVxyXG4gIC5mYWN0b3J5KCdCdXNMaW5lcycsIHJlcXVpcmUoJy4vc2VydmljZS9idXNMaW5lcycpKVxyXG4gIC5jb25zdGFudCgnT3BlbkJ1c0RhdGFBcGknLCByZXF1aXJlKCcuL2NvbnN0YW50L2FwaUJ1cycpKVxyXG47XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBAbmdJbmplY3RcclxuICovXHJcbmZ1bmN0aW9uIEJ1c0xpbmVzU2VydmljZSgkaHR0cCwgJGxvZywgT3BlbkJ1c0RhdGFBcGkpIHtcclxuICAvLyBJbnRlcmZhY2VcclxuICB2YXIgc2VydmljZSA9IHtcclxuICAgIGdldDogZ2V0LFxyXG4gICAgZ2V0QnlJZDogZ2V0QnlJZFxyXG4gIH07XHJcbiAgcmV0dXJuIHNlcnZpY2U7XHJcblxyXG4gIC8vIEltcGxlbWVudGF0aW9uXHJcblxyXG4gIGZ1bmN0aW9uIGdldCgpIHtcclxuICAgIHZhciBhcGlBcmdzID0ge1xyXG4gICAgICB1cmw6IE9wZW5CdXNEYXRhQXBpLnVybCxcclxuICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgdmVyc2lvbjogT3BlbkJ1c0RhdGFBcGkudmVyc2lvbixcclxuICAgICAgICBrZXk6IE9wZW5CdXNEYXRhQXBpLmtleSxcclxuICAgICAgICBjbWQ6IE9wZW5CdXNEYXRhQXBpLmNtZFxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy8gVE9ETzogQXBwZWwgYXUgd2ViIHNlcnZpY2UgZW4gdXRpbGlzYW50IGxlIHNlcnZpY2UgYW5ndWxhciAkaHR0cFxyXG4gICAgdmFyIHByb21pc2UgPSAkaHR0cChhcGlBcmdzKTtcclxuICAgIHByb21pc2UudGhlbihmdW5jdGlvbiBvblN1Y2Nlc3MocmVzcG9uc2UpIHtcclxuICAgICAgJGxvZy5sb2cocmVzcG9uc2UpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldEJ5SWQoaWRMaW5lKSB7XHJcbiAgICAvKnZhciBwYXJhbWV0ZXIgPSAnP3BhcmFtW3N0YXRpb25dPW51bWJlciZwYXJhbVt2YWx1ZV09JyArIGlkU3RhdGlvbjtcclxuXHJcbiAgICB2YXIgYXBpQXJncyA9IHtcclxuICAgICAgdXJsOiBPcGVuRGF0YUFwaS51cmwgKyBwYXJhbWV0ZXIsXHJcbiAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgIHBhcmFtczoge1xyXG4gICAgICAgIHZlcnNpb246IE9wZW5EYXRhQXBpLnZlcnNpb24sXHJcbiAgICAgICAga2V5OiBPcGVuRGF0YUFwaS5rZXksXHJcbiAgICAgICAgY21kOiBPcGVuRGF0YUFwaS5jbWRcclxuICAgICAgfSxcclxuICAgICAgcGFyYW06IHtcclxuICAgICAgICBzdGF0aW9uOiAnbnVtYmVyJyxcclxuICAgICAgICB2YWx1ZTogaWRTdGF0aW9uXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gVE9ETzogQXBwZWwgYXUgd2ViIHNlcnZpY2UgZW4gdXRpbGlzYW50IGxlIHNlcnZpY2UgYW5ndWxhciAkaHR0cFxyXG4gICAgdmFyIHByb21pc2UgPSAkaHR0cChhcGlBcmdzKTtcclxuICAgIHByb21pc2UudGhlbihmdW5jdGlvbiBvblN1Y2Nlc3MocmVzcG9uc2UpIHtcclxuICAgICAgJGxvZy5sb2cocmVzcG9uc2UpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTsqL1xyXG4gIH1cclxufVxyXG5CdXNMaW5lc1NlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJGxvZycsICdPcGVuQnVzRGF0YUFwaSddO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCdXNMaW5lc1NlcnZpY2U7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIEBuZ0luamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gU3RhdGlvbnNTZXJ2aWNlKCRodHRwLCAkbG9nLCBPcGVuRGF0YUFwaSkge1xyXG4gIC8vIEludGVyZmFjZVxyXG4gIHZhciBzZXJ2aWNlID0ge1xyXG4gICAgZ2V0OiBnZXQsXHJcbiAgICBnZXRCeUlkOiBnZXRCeUlkXHJcbiAgfTtcclxuICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgLy8gSW1wbGVtZW50YXRpb25cclxuXHJcbiAgZnVuY3Rpb24gZ2V0KCkge1xyXG4gICAgdmFyIGFwaUFyZ3MgPSB7XHJcbiAgICAgIHVybDogT3BlbkRhdGFBcGkudXJsLFxyXG4gICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICBwYXJhbXM6IHtcclxuICAgICAgICB2ZXJzaW9uOiBPcGVuRGF0YUFwaS52ZXJzaW9uLFxyXG4gICAgICAgIGtleTogT3BlbkRhdGFBcGkua2V5LFxyXG4gICAgICAgIGNtZDogT3BlbkRhdGFBcGkuY21kXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICAvLyBUT0RPOiBBcHBlbCBhdSB3ZWIgc2VydmljZSBlbiB1dGlsaXNhbnQgbGUgc2VydmljZSBhbmd1bGFyICRodHRwXHJcbiAgICB2YXIgcHJvbWlzZSA9ICRodHRwKGFwaUFyZ3MpO1xyXG4gICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXNwb25zZSkge1xyXG4gICAgICAkbG9nLmxvZyhyZXNwb25zZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0QnlJZChpZFN0YXRpb24pIHtcclxuICAgIHZhciBwYXJhbWV0ZXIgPSAnP3BhcmFtW3N0YXRpb25dPW51bWJlciZwYXJhbVt2YWx1ZV09JyArIGlkU3RhdGlvbjtcclxuXHJcbiAgICB2YXIgYXBpQXJncyA9IHtcclxuICAgICAgdXJsOiBPcGVuRGF0YUFwaS51cmwgKyBwYXJhbWV0ZXIsXHJcbiAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgIHBhcmFtczoge1xyXG4gICAgICAgIHZlcnNpb246IE9wZW5EYXRhQXBpLnZlcnNpb24sXHJcbiAgICAgICAga2V5OiBPcGVuRGF0YUFwaS5rZXksXHJcbiAgICAgICAgY21kOiBPcGVuRGF0YUFwaS5jbWRcclxuICAgICAgfSxcclxuICAgICAgcGFyYW06IHtcclxuICAgICAgICBzdGF0aW9uOiAnbnVtYmVyJyxcclxuICAgICAgICB2YWx1ZTogaWRTdGF0aW9uXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gVE9ETzogQXBwZWwgYXUgd2ViIHNlcnZpY2UgZW4gdXRpbGlzYW50IGxlIHNlcnZpY2UgYW5ndWxhciAkaHR0cFxyXG4gICAgdmFyIHByb21pc2UgPSAkaHR0cChhcGlBcmdzKTtcclxuICAgIHByb21pc2UudGhlbihmdW5jdGlvbiBvblN1Y2Nlc3MocmVzcG9uc2UpIHtcclxuICAgICAgJGxvZy5sb2cocmVzcG9uc2UpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9XHJcbn1cclxuU3RhdGlvbnNTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRsb2cnLCAnT3BlbkRhdGFBcGknXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3RhdGlvbnNTZXJ2aWNlOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBAbmdJbmplY3RcclxuICovXHJcbmZ1bmN0aW9uIFJvdXRpbmdDb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAvLyBDb25maWd1cmF0aW9uIGRlcyByb3V0ZXMgZGUgbCdhcHBsaWNhdGlvblxyXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9hY2N1ZWlsJyk7XHJcblxyXG4gIC8vIENvbmZpZ3VyYXRpb24gZGVzIMOpdGF0c1xyXG4gICRzdGF0ZVByb3ZpZGVyXHJcbiAgXHQuc3RhdGUoJ2FjY3VlaWwnLCB7XHJcblx0ICBcdHVybDogJy9hY2N1ZWlsJyxcclxuXHQgIFx0dGVtcGxhdGVVcmw6ICcvdmlld3MvYWNjdWVpbC5odG1sJ1xyXG5cdCAgfSlcclxuICAgIC5zdGF0ZSgndmVsaWItc3RhdGlvbnMnLCB7XHJcbiAgICAgIHVybDogJy92ZWxpYi1zdGF0aW9ucycsXHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL3ZlbGliX3N0YXRpb25zLmh0bWwnLFxyXG4gICAgICBjb250cm9sbGVyOiAnVmVsaWJDb250cm9sbGVyIGFzIHZtJ1xyXG4gICAgfSlcclxuICBcdC5zdGF0ZSgnZGV0YWlsLXZlbGliLXN0YXRpb24nLCB7XHJcbiAgXHRcdHVybDogJy92ZWxpYi1zdGF0aW9ucy9kZXRhaWwvOmlkJyxcclxuICBcdFx0dGVtcGxhdGVVcmw6ICcvdmlld3MvZGV0YWlsX3N0YXRpb24uaHRtbCcsXHJcbiAgXHRcdGNvbnRyb2xsZXI6ICdCaWtlU3RhdGlvbkRldGFpbENvbnRyb2xsZXIgYXMgdm0nXHJcbiAgXHR9KVxyXG4gICAgLnN0YXRlKCdidXMtbGluZXMnLCB7XHJcbiAgICAgIHVybDogJy9idXMtbGluZXMnLFxyXG4gICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9idXNfbGluZXMuaHRtbCcsXHJcbiAgICAgIGNvbnRyb2xsZXI6ICdCdXNMaW5lc0NvbnRyb2xsZXIgYXMgdm0nXHJcbiAgICB9KVxyXG4gIDtcclxuXHJcbiAgLy8gQ29uZmlndXJhdGlvbiBkdSBwdXNoIHN0YXRlXHJcbiAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG59XHJcblJvdXRpbmdDb25maWcuJGluamVjdCA9IFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJywgJyRsb2NhdGlvblByb3ZpZGVyJ107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRpbmdDb25maWc7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIEBuZ0luamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gQmlrZVN0YXRpb25EZXRhaWxDb250cm9sbGVyKFN0YXRpb25zLCAkc2NvcGUsICRzdGF0ZVBhcmFtcywgJGxvZywgJHRpbWVvdXQsIEdlb2xvY2F0aW9uKSB7XHJcblx0Ly8gVmlld01vZGVsXHJcblx0Ly8gdmFyIHZtID0gdGhpcztcclxuXHJcblx0JHNjb3BlLmRldGFpbFN0YXRpb24gPSB7fTtcclxuXHQkc2NvcGUuc2hvd0xvYWRlciA9IHRydWU7XHJcblx0JHNjb3BlLnNob3cgPSBmYWxzZTtcclxuXHQkc2NvcGUuc2hvd0luc3RydWN0aW9ucyA9IGZhbHNlO1xyXG5cdCRzY29wZS5tYXAgPSB7fTtcclxuXHQkc2NvcGUubWFya2VycyA9IFtdO1xyXG5cdCRzY29wZS5pbnN0cnVjdGlvbnMgPSBbXTtcclxuXHQkc2NvcGUuZGlzdGFuY2UgPSAwO1xyXG5cdCRzY29wZS5vcHRpb25zID0ge1xyXG5cdCAgICB6b29tOiAxNSxcclxuXHQgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUFxyXG5cdH07XHJcblxyXG5cdFN0YXRpb25zLmdldEJ5SWQoJHN0YXRlUGFyYW1zLmlkKS50aGVuKGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXNwb25zZSkge1xyXG5cdFx0dmFyIGRldGFpbFN0YXRpb24gPSByZXNwb25zZS5kYXRhLm9wZW5kYXRhLmFuc3dlci5kYXRhLnN0YXRpb24sXHJcblx0XHRcdHRvdGFsQmlrZXMgPSBwYXJzZUludChkZXRhaWxTdGF0aW9uLnNsb3RzYXZhaWxhYmxlLCAxMCkgKyBwYXJzZUludChkZXRhaWxTdGF0aW9uLmJpa2VzYXZhaWxhYmxlLCAxMCksXHJcblx0XHRcdHBlcmNlbnRCaWtlcyA9IGRldGFpbFN0YXRpb24uYmlrZXNhdmFpbGFibGUvdG90YWxCaWtlcyxcclxuXHRcdFx0cGVyY2VudFBsYWNlcyA9IGRldGFpbFN0YXRpb24uc2xvdHNhdmFpbGFibGUvdG90YWxCaWtlcyxcclxuXHRcdFx0dHlwZUJpa2VzLFxyXG5cdFx0XHR0eXBlUGxhY2VzLFxyXG5cdFx0XHRkZXN0aW5hdGlvbiA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoZGV0YWlsU3RhdGlvbi5sYXRpdHVkZSwgZGV0YWlsU3RhdGlvbi5sb25naXR1ZGUpO1xyXG5cclxuXHRcdC8vdm0uc3RhdGlvbnMgPSBzdGF0aW9ucztcclxuXHRcdCRzY29wZS5kZXRhaWxTdGF0aW9uID0gZGV0YWlsU3RhdGlvbjtcclxuXHJcblx0XHQkc2NvcGUubWFwLnBhblRvKGRlc3RpbmF0aW9uKTtcclxuXHRcdCRzY29wZS5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xyXG5cdFx0JHNjb3BlLm1hcmtlcnMucHVzaChuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuXHRcdCAgICBtYXA6ICRzY29wZS5tYXAsXHJcblx0XHQgICAgcG9zaXRpb246IGRlc3RpbmF0aW9uLFxyXG5cdFx0ICAgIGljb246ICdodHRwczovL21hcHMuZ3N0YXRpYy5jb20vbWFwZmlsZXMvbXMyL21pY29ucy9yZWQtZG90LnBuZydcclxuXHRcdH0pKTtcclxuXHJcblx0XHR2YXIgZGlyZWN0aW9uc0Rpc3BsYXkgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyKCk7XHJcbiAgICAgICAgLy90aGlzIGlzIHdoZXJlIHdlIHBhc3Mgb3VyIHRoZSBtYXAgb2JqZWN0IHRvIHRoZSBkaXJlY3Rpb25zRGlzcGxheS5zZXRNYXAgbWV0aG9kXHJcbiAgICAgICAgZGlyZWN0aW9uc0Rpc3BsYXkuc2V0TWFwKCRzY29wZS5tYXApO1xyXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIoJHNjb3BlLm1hcCwgJ3Jlc2l6ZScpO1xyXG5cclxuICAgICAgICAvLyBIVE1MNSBnZW9sb2NhbGl6ZVxyXG4gICAgICAgICRzY29wZS5nZW9sb2NhbGl6ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgIEdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigpLnRoZW4oZnVuY3Rpb24gb25HZXRDdXJyZW50UG9zaXRpb24oZ2VvcG9zaXRpb24pIHtcclxuXHRcdCAgICAgIFx0dmFyIGNvb3JkcyA9IGdlb3Bvc2l0aW9uLmNvb3JkcztcclxuXHRcdCAgICAgIFx0Ly8gU2V0IGl0aW5lcmFpcmVcclxuXHRcdCAgICBcdGZpbmRQYXRoKGNvb3Jkcyk7XHJcblx0XHQgICAgfSk7XHJcblx0XHR9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZpbmRQYXRoKGNvb3Jkcykge1xyXG4gICAgICAgICAgICAvL3VzaW5nIHRoZSBkaXJlY3Rpb24gc2VydmljZSBvZiBnb29nbGUgbWFwIGFwaVxyXG4gICAgICAgICAgICAkc2NvcGUuZGlyZWN0aW9uc1NlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1NlcnZpY2UoKTtcclxuICAgICAgICAgICAgJHNjb3BlLm1hcmtlcnMuc3BsaWNlKDAsIDEpO1xyXG5cclxuICAgICAgICAgICAgJGxvZy5sb2coJHNjb3BlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGNvb3Jkcy5sYXRpdHVkZSwgY29vcmRzLmxvbmdpdHVkZSksXHJcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbjogJHNjb3BlLmRlc3RpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHJhdmVsTW9kZTogZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuV0FMS0lOR1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvL2NhbGwgdGhlIHJvdXRlIG1ldGhvZCBvbiBnb29nbGUgbWFwIGFwaSBkaXJlY3Rpb24gc2VydmljZSB3aXRoIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgICAgIC8vd2hpY2ggcmV0dXJucyBhIHJlc3BvbnNlIHdoaWNoIGNhbiBiZSBkaXJlY3RseSBwcm92aWRlZCB0b1xyXG4gICAgICAgICAgICAvL2RpcmVjdGlvbmRpc3BsYXkgb2JqZWN0IHRvIGRpc3BsYXkgdGhlIHJvdXRlIHJldHVybmVkIG9uIHRoZSBtYXBcclxuICAgICAgICAgICAgJHNjb3BlLmRpcmVjdGlvbnNTZXJ2aWNlLnJvdXRlKHJlcXVlc3QsIGZ1bmN0aW9uKHJlc3BvbnNlLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgXHR2YXIgaW5zdHJ1Y3Rpb25zID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTdGF0dXMuT0spIHtcclxuICAgICAgICAgICAgICAgIFx0aW5zdHJ1Y3Rpb25zID0gcmVzcG9uc2Uucm91dGVzWzBdLmxlZ3NbMF0uc3RlcHM7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbnNEaXNwbGF5LnNldERpcmVjdGlvbnMocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLnJvdXRlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kaXN0YW5jZSA9IHJlc3BvbnNlLnJvdXRlc1swXS5sZWdzWzBdLmRpc3RhbmNlLnZhbHVlIC8gMTAwMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSw6ljdXDDqXJhdGlvbiBkZXMgaW5zdHJ1Y3Rpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zLm1hcChmdW5jdGlvbihpbnN0cnVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIFx0cmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBcdFx0ZHVyYXRpb246IGluc3RydWN0aW9uLmR1cmF0aW9uWyd0ZXh0J10sXHJcbiAgICAgICAgICAgICAgICAgICAgXHRcdGRpc3RhbmNlOiBpbnN0cnVjdGlvbi5kaXN0YW5jZVsndGV4dCddLFxyXG4gICAgICAgICAgICAgICAgICAgIFx0XHRpbnN0cnVjdGlvbjogaW5zdHJ1Y3Rpb24uaW5zdHJ1Y3Rpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgXHR9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGxvZy5sb2coaW5zdHJ1Y3Rpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kaXN0YW5jZVRvdGFsID0gcmVzcG9uc2Uucm91dGVzWzBdLmxlZ3NbMF0uZGlzdGFuY2VbJ3RleHQnXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudGVtcHNUb3RhbCA9IHJlc3BvbnNlLnJvdXRlc1swXS5sZWdzWzBdLmR1cmF0aW9uWyd0ZXh0J107XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNob3dJbnN0cnVjdGlvbnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cdFx0Ly8gRGVmaW5lIHByb2dyZXNzQmFyXHJcblx0XHRzZXRQcm9ncmVzc0JhcihwZXJjZW50QmlrZXMsIHBlcmNlbnRQbGFjZXMsIHR5cGVCaWtlcywgdHlwZVBsYWNlcyk7XHJcblx0XHQkc2NvcGUubWF4ID0gdG90YWxCaWtlcztcclxuXHJcblx0XHQkbG9nLmxvZygkc2NvcGUpO1xyXG5cdFx0JGxvZy5sb2coZGV0YWlsU3RhdGlvbik7XHJcblxyXG5cdH0pO1xyXG5cclxuXHJcblx0ZnVuY3Rpb24gc2V0UHJvZ3Jlc3NCYXIocGVyY2VudEJpa2VzLCBwZXJjZW50UGxhY2VzLCB0eXBlQmlrZXMsIHR5cGVQbGFjZXMpIHtcclxuXHJcblx0XHRpZiAocGVyY2VudEJpa2VzIDwgMC4yNSkge1xyXG5cdFx0XHR0eXBlQmlrZXMgPSAnZGFuZ2VyJztcclxuXHRcdH0gZWxzZSBpZiAocGVyY2VudEJpa2VzIDwgMC41KSB7XHJcblx0XHRcdHR5cGVCaWtlcyA9ICd3YXJuaW5nJztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHR5cGVCaWtlcyA9ICdzdWNjZXNzJztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAocGVyY2VudFBsYWNlcyA8IDAuMjUpIHtcclxuXHRcdFx0dHlwZVBsYWNlcyA9ICdkYW5nZXInO1xyXG5cdFx0fSBlbHNlIGlmIChwZXJjZW50UGxhY2VzIDwgMC41KSB7XHJcblx0XHRcdHR5cGVQbGFjZXMgPSAnd2FybmluZyc7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0eXBlUGxhY2VzID0gJ3N1Y2Nlc3MnO1xyXG5cdFx0fVxyXG5cclxuXHRcdCRzY29wZS50eXBlQmlrZXMgPSB0eXBlQmlrZXM7XHJcblx0XHQkc2NvcGUudHlwZVBsYWNlcyA9IHR5cGVQbGFjZXM7XHJcblxyXG5cdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdCAgICAkc2NvcGUuc2hvdyA9IHRydWU7XHJcblx0XHR9LCAyMDApO1xyXG5cdH1cclxuXHJcbn1cclxuQmlrZVN0YXRpb25EZXRhaWxDb250cm9sbGVyLiRpbmplY3QgPSBbJ1N0YXRpb25zJywgJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCAnJGxvZycsICckdGltZW91dCcsICdHZW9sb2NhdGlvbiddO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCaWtlU3RhdGlvbkRldGFpbENvbnRyb2xsZXI7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBAbmdJbmplY3RcclxuICovXHJcbmZ1bmN0aW9uIEJ1c0xpbmVzQ29udHJvbGxlcihCdXNMaW5lcywgJGxvZywgJHNjb3BlKSB7XHJcblx0Ly8gVmlld01vZGVsXHJcblx0Ly8gdmFyIHZtID0gdGhpcztcclxuXHRcclxuXHQvL3ZtLnN0YXRpb25zID0gW107XHJcblx0JHNjb3BlLmxpbmVzID0gW107XHJcblx0JHNjb3BlLnNob3dMb2FkZXIgPSB0cnVlO1xyXG5cclxuXHRCdXNMaW5lcy5nZXQoKS50aGVuKGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXNwb25zZSkge1xyXG5cdFx0dmFyIGxpbmVzID0gcmVzcG9uc2UuZGF0YS5vcGVuZGF0YS5hbnN3ZXIuZGF0YS5saW5lO1xyXG5cdFx0Ly92bS5zdGF0aW9ucyA9IHN0YXRpb25zO1xyXG5cdFx0JHNjb3BlLmxpbmVzID0gbGluZXM7XHJcblx0XHQkc2NvcGUuYmFzZVVybCA9IHJlc3BvbnNlLmRhdGEub3BlbmRhdGEuYW5zd2VyLmRhdGEuYmFzZXVybDtcclxuXHRcdCRsb2cubG9nKGxpbmVzKTtcclxuXHR9KTtcclxuXHJcbn1cclxuQnVzTGluZXNDb250cm9sbGVyLiRpbmplY3QgPSBbJ0J1c0xpbmVzJywgJyRsb2cnLCAnJHNjb3BlJ107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1c0xpbmVzQ29udHJvbGxlcjtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIEBuZ0luamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gVmVsaWJDb250cm9sbGVyKFN0YXRpb25zLCAkbG9nLCAkc2NvcGUpIHtcclxuXHQvLyBWaWV3TW9kZWxcclxuXHQvLyB2YXIgdm0gPSB0aGlzO1xyXG5cdFxyXG5cdC8vdm0uc3RhdGlvbnMgPSBbXTtcclxuXHQkc2NvcGUuc3RhdGlvbnMgPSBbXTtcclxuXHQkc2NvcGUuc2hvd0xvYWRlciA9IHRydWU7XHJcblxyXG5cdFN0YXRpb25zLmdldCgpLnRoZW4oZnVuY3Rpb24gb25TdWNjZXNzKHJlc3BvbnNlKSB7XHJcblx0XHR2YXIgc3RhdGlvbnMgPSByZXNwb25zZS5kYXRhLm9wZW5kYXRhLmFuc3dlci5kYXRhLnN0YXRpb247XHJcblx0XHQvL3ZtLnN0YXRpb25zID0gc3RhdGlvbnM7XHJcblx0XHQkc2NvcGUuc3RhdGlvbnMgPSBzdGF0aW9ucztcclxuXHRcdCRsb2cubG9nKHN0YXRpb25zKTtcclxuXHR9KTtcclxuXHJcbn1cclxuVmVsaWJDb250cm9sbGVyLiRpbmplY3QgPSBbJ1N0YXRpb25zJywgJyRsb2cnLCAnJHNjb3BlJ107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFZlbGliQ29udHJvbGxlcjtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIEBuZ0luamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gY3VzdG9tTG9hZGVyKCkge1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0cmVzdHJpY3Q6ICdFJywgLy8gRWxlbWVudFxyXG5cdFx0dGVtcGxhdGU6IFxyXG5cdFx0JzxkaXYgaWQ9XCJsb2FkZXJEaXZcIiBjbGFzcz1cImN1c3RvbUxvYWRlclwiIG5nLXNob3c9XCJzaG93TG9hZGVyXCI+JyArXHJcbiAgICAgICAgICAnPGltZyBzcmM9XCJodHRwOi8vcHJlbG9hZGVycy5uZXQvcHJlbG9hZGVycy8xNjYvUGFjbWFuLmdpZlwiIGNsYXNzPVwiYWpheC1sb2FkZXJcIi8+JyArXHJcbiAgICAgICAgJzwvZGl2PicsXHJcbiAgICAgICAgbGluazpcclxuXHRcdGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50KSB7XHJcblx0ICAgICAgICAkc2NvcGUuJG9uKCdsb2FkZXJTaG93JywgZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgICAgICAgICRzY29wZS5zaG93TG9hZGVyID0gdHJ1ZTtcclxuXHQgICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQ7XHJcblx0ICAgICAgICB9KTtcclxuXHQgICAgICAgICRzY29wZS4kb24oJ2xvYWRlckhpZGUnLCBmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgICAgICAgJHNjb3BlLnNob3dMb2FkZXIgPSBmYWxzZTtcclxuXHQgICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQ7XHJcblx0ICAgICAgICB9KTtcclxuICAgIFx0fVxyXG4gICAgfTtcclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3VzdG9tTG9hZGVyO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogQG5nSW5qZWN0XHJcbiAqL1xyXG5mdW5jdGlvbiBwYWdpbmF0b3IoKSB7XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRyZXN0cmljdDogJ0EnLCAvLyBBdHRyaWJ1dFxyXG5cdFx0c2NvcGU6IHtpdGVtczogJyYnfSxcclxuXHRcdHRlbXBsYXRlVXJsOiAnL3ZpZXdzL2RpcmVjdGl2ZXMvcGFnaW5hdG9yLmh0bWwnLFxyXG5cdCAgICByZXBsYWNlOiBmYWxzZSxcclxuXHQgICAgY29tcGlsZTogZnVuY3Rpb24gY29tcGlsZSgpIHtcclxuXHQgICAgICByZXR1cm4ge1xyXG5cdCAgICAgICAgcHJlOiBmdW5jdGlvbiBwcmVMaW5rKHNjb3BlKSB7XHJcblx0ICAgICAgICAgIHNjb3BlLnBhZ2VTaXplTGlzdCA9IFs5LCAxOCwgNDUsIDEwMF07XHJcblx0ICAgICAgICAgIHNjb3BlLnBhZ2luYXRvciA9IHtcclxuXHQgICAgICAgICAgICBwYWdlU2l6ZTogOSxcclxuXHQgICAgICAgICAgICBjdXJyZW50UGFnZTogMFxyXG5cdCAgICAgICAgICB9O1xyXG5cclxuXHQgICAgICAgICAgc2NvcGUudG90YWxJdGVtcyA9IGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICAgICAgXHRyZXR1cm4gc2NvcGUuaXRlbXMoKS5sZW5ndGg7XHJcblx0ICAgICAgICAgIH07XHJcblx0ICAgICAgICAgIHNjb3BlLmlzRmlyc3RQYWdlID0gZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgICAgICAgIHJldHVybiBzY29wZS5wYWdpbmF0b3IuY3VycmVudFBhZ2UgPT09IDA7XHJcblx0ICAgICAgICAgIH07XHJcblx0ICAgICAgICAgIHNjb3BlLmlzTGFzdFBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgICAgICAgcmV0dXJuIHNjb3BlLnBhZ2luYXRvci5jdXJyZW50UGFnZSA+PSBzY29wZS5udW1iZXJPZlBhZ2VzKCkgLSAxO1xyXG5cdCAgICAgICAgICB9O1xyXG5cdCAgICAgICAgICBzY29wZS5pbmNQYWdlID0gZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgICAgICAgIGlmICghc2NvcGUuaXNMYXN0UGFnZSgpKSB7XHJcblx0ICAgICAgICAgICAgICBzY29wZS5wYWdpbmF0b3IuY3VycmVudFBhZ2UrKztcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICAgIH07XHJcblx0ICAgICAgICAgIHNjb3BlLmRlY1BhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgICAgICAgaWYgKCFzY29wZS5pc0ZpcnN0UGFnZSgpKSB7XHJcblx0ICAgICAgICAgICAgICBzY29wZS5wYWdpbmF0b3IuY3VycmVudFBhZ2UtLTtcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICAgIH07XHJcblx0ICAgICAgICAgIHNjb3BlLmZpcnN0UGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICAgICAgICBzY29wZS5wYWdpbmF0b3IuY3VycmVudFBhZ2UgPSAwO1xyXG5cdCAgICAgICAgICB9O1xyXG5cdCAgICAgICAgICBzY29wZS5sYXN0UGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICAgICAgXHRzY29wZS5wYWdpbmF0b3IuY3VycmVudFBhZ2UgPSBzY29wZS5udW1iZXJPZlBhZ2VzKCkgLSAxO1xyXG5cdCAgICAgICAgICB9O1xyXG5cdCAgICAgICAgICBzY29wZS5udW1iZXJPZlBhZ2VzID0gZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwoc2NvcGUudG90YWxJdGVtcygpIC8gc2NvcGUucGFnaW5hdG9yLnBhZ2VTaXplKTtcclxuXHQgICAgICAgICAgfTtcclxuXHQgICAgICAgICAgc2NvcGUuJHdhdGNoKCdwYWdpbmF0b3IucGFnZVNpemUnLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuXHQgICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XHJcblx0ICAgICAgICAgICAgICBzY29wZS5maXJzdFBhZ2UoKTtcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICAgIH0pO1xyXG5cclxuXHQgICAgICAgICAgLy8gLS0tLSBGdW5jdGlvbnMgYXZhaWxhYmxlIGluIHBhcmVudCBzY29wZSAtLS0tLVxyXG5cclxuXHQgICAgICAgICAgc2NvcGUuJHBhcmVudC5maXJzdFBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgICAgICAgc2NvcGUuZmlyc3RQYWdlKCk7XHJcblx0ICAgICAgICAgIH07XHJcblx0ICAgICAgICAgIC8vIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgcmVkdWNlZCBpdGVtcyBsaXN0LCB0byB1c2UgaW4gbmctcmVwZWF0XHJcblx0ICAgICAgICAgIHNjb3BlLiRwYXJlbnQucGFnZUl0ZW1zID0gZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgICAgICAgIHZhciBzdGFydCA9IHNjb3BlLnBhZ2luYXRvci5jdXJyZW50UGFnZSAqIHNjb3BlLnBhZ2luYXRvci5wYWdlU2l6ZTtcclxuXHQgICAgICAgICAgICB2YXIgbGltaXQgPSBzY29wZS5wYWdpbmF0b3IucGFnZVNpemU7XHJcblx0ICAgICAgICAgICAgcmV0dXJuIHNjb3BlLml0ZW1zKCkuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgbGltaXQpO1xyXG5cdCAgICAgICAgICB9O1xyXG5cdCAgICAgICAgfSxcclxuXHQgICAgICAgIHBvc3Q6IGZ1bmN0aW9uIHBvc3RMaW5rKCkge31cclxuXHQgICAgICB9O1xyXG5cdCAgICB9XHJcblx0fTtcclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcGFnaW5hdG9yOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhclxyXG4gIC5tb2R1bGUoJ2JvaWxlcnBsYXRlLnVpJywgW1xyXG4gICAgJ2JvaWxlcnBsYXRlLmNvbW1vbicsXHJcbiAgICAnYm9pbGVycGxhdGUuZGF0YScsXHJcbiAgICAndWkuYm9vdHN0cmFwJyxcclxuICAgICd1aS5yb3V0ZXInLFxyXG4gICAgJ3VpLm1hcCcsXHJcbiAgICAnbmdTYW5pdGl6ZSdcclxuICBdKVxyXG4gIC5jb25maWcocmVxdWlyZSgnLi9jb25maWcvcm91dGluZycpKVxyXG4gIC5jb250cm9sbGVyKCdWZWxpYkNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL3ZlbGliU3RhdGlvbnMnKSlcclxuICAuY29udHJvbGxlcignQmlrZVN0YXRpb25EZXRhaWxDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb250cm9sbGVycy9iaWtlU3RhdGlvbkRldGFpbCcpKVxyXG4gIC5kaXJlY3RpdmUoJ2N1c3RvbUxvYWRlcicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2N1c3RvbUxvYWRlcicpKVxyXG4gIC5kaXJlY3RpdmUoJ3BhZ2luYXRvcicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL3BhZ2luYXRvcicpKVxyXG4gIC5jb250cm9sbGVyKCdCdXNMaW5lc0NvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL2J1c0xpbmVzJykpXHJcbjtcclxuIl19
