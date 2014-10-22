'use strict';

/**
 * @ngInject
 */
function HomeController(Stations, $log, $scope) {
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

module.exports = HomeController;
