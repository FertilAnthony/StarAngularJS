'use strict';

/**
 * @ngInject
 */
function HomeController(Stations, $log, Tracer) {
	// ViewModel
	var vm = this;

	vm.welcomeMessage = 'Bienvenue dans l\'application pour la star de Rennes';
	vm.stations = [];

	Stations.get().then(function onSuccess(response) {
		var stations = response.data.opendata.answer.data.station;
		vm.stations = stations;
		$log.log(stations);
	});

	// Use Tracer
	Tracer.trace(HomeController);

}

module.exports = HomeController;
