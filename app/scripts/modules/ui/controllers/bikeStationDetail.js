'use strict';

/**
 * @ngInject
 */
function BikeStationDetailController(Stations, $scope, $stateParams, $log) {
	// ViewModel
	var vm = this;

	$scope.detailStation = {};
	$scope.showLoader = true;

	Stations.getById($stateParams.id).then(function onSuccess(response) {
		var detailStation = response.data.opendata.answer.data.station;
		//vm.stations = stations;
		$scope.detailStation = detailStation;
		$log.log(detailStation);
	});

}

module.exports = BikeStationDetailController;
