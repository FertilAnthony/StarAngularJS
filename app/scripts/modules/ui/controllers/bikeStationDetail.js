'use strict';

/**
 * @ngInject
 */
function BikeStationDetailController(Stations, $scope, $stateParams, $log, $timeout) {
	// ViewModel
	// var vm = this;

	$scope.detailStation = {};
	$scope.showLoader = true;
	$scope.show = false;

	Stations.getById($stateParams.id).then(function onSuccess(response) {
		var detailStation = response.data.opendata.answer.data.station,
			totalBikes = parseInt(detailStation.slotsavailable, 10) + parseInt(detailStation.bikesavailable, 10),
			percentBikes = detailStation.bikesavailable/totalBikes,
			percentPlaces = detailStation.slotsavailable/totalBikes,
			typeBikes,
			typePlaces;
		//vm.stations = stations;
		$scope.detailStation = detailStation;

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
		$scope.max = totalBikes;

		$timeout(function(){
		    $scope.show = true;
		}, 200);

		$log.log($scope);
		$log.log(detailStation);

	});

}

module.exports = BikeStationDetailController;
