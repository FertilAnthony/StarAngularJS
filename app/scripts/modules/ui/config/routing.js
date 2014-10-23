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
    /*.state('bus-stations', {
      url: '/bus-stations',
      templateUrl: '/views/bus_stations.html',
      controller: 'BusController as vm'
    })*/
  ;

  // Configuration du push state
  $locationProvider.html5Mode(true);
}

module.exports = RoutingConfig;