'use strict';

/**
 * @ngInject
 */
function HomeController(Stations, $log, $scope) {
	// ViewModel
	var vm = this;

	vm.welcomeMessage = 'Bienvenue dans l\'application pour la star de Rennes';
	//vm.stations = [];
	$scope.stations = [];


	Stations.get().then(function onSuccess(response) {
		var stations = response.data.opendata.answer.data.station;
		//vm.stations = stations;
		$scope.stations = stations;
		$log.log(stations);
	});

}

module.exports = HomeController;
