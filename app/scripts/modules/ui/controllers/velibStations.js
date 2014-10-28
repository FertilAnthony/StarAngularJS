'use strict';

/**
 * @ngInject
 */
function VelibController(Stations, $log, $scope, Geolocation) {
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
	
	$scope.$watch('search', function(newValue, oldValue) {
		if (newValue != oldValue) {
			$scope.firstPage();
		} 
	});
	
	// HTML5 geolocalize
	$scope.findNearStation = function() {
		Geolocation.getCurrentPosition().then(function onGetCurrentPosition(geoposition) {
			var coords = geoposition.coords;
			// Set itineraire
			$log.log(coords);
		});
	}

}

module.exports = VelibController;
