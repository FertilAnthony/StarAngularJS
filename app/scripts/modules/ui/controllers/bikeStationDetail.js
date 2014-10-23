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
	$scope.map = {};
	$scope.markers = [];
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
			position = new google.maps.LatLng(detailStation.latitude, detailStation.longitude);

		//vm.stations = stations;
		$scope.detailStation = detailStation;

		$scope.map.panTo(position);
		$scope.markers.push(new google.maps.Marker({
		    map: $scope.map,
		    position: position,
		    icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png'
		}));

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

module.exports = BikeStationDetailController;
