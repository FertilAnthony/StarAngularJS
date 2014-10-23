'use strict';

/**
 * @ngInject
 */
function HomeController(BusStations, $log, $scope) {
	// ViewModel
	// var vm = this;
	
	//vm.stations = [];
	$scope.stations = [];
	$scope.showLoader = true;

	BusStations.get().then(function onSuccess(response) {
		var stations = response.data.opendata.answer.data.station;
		//vm.stations = stations;
		$scope.stations = stations;
		$log.log(stations);
	});

}

module.exports = HomeController;
