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
	  	templateUrl: '/views/accueil.html',
	  	controller: 'HomeController as vm'
	  })/*
  	.state('stations.detail', {
  		url: '/detail',
  		templateUrl: 'views/detail',
  		controller: 'StationsController as vm'
  	})*/;

  // Configuration du push state
  $locationProvider.html5Mode(true);
}

module.exports = RoutingConfig;