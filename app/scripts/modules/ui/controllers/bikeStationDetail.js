'use strict';

/**
 * @ngInject
 */
function BikeStationDetailController(Stations, $scope, $stateParams, $log, $timeout, Geolocation) {
	// ViewModel
	// var vm = this;

	$scope.detailStation = {};
	$scope.showLoader = true;
	$scope.show = false;
	$scope.map = {};
	$scope.markers = [];
	$scope.distance = 0;
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
			destination = new google.maps.LatLng(detailStation.latitude, detailStation.longitude);

		//vm.stations = stations;
		$scope.detailStation = detailStation;

		$scope.map.panTo(destination);
		$scope.destination = destination;
		$scope.markers.push(new google.maps.Marker({
		    map: $scope.map,
		    position: destination,
		    icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png'
		}));

		var directionsDisplay = new google.maps.DirectionsRenderer();
        //this is where we pass our the map object to the directionsDisplay.setMap method
        directionsDisplay.setMap($scope.map);
        google.maps.event.trigger($scope.map, 'resize');

        // HTML5 geolocalize
        $scope.geolocalize = function() {
		    Geolocation.getCurrentPosition().then(function onGetCurrentPosition(geoposition) {
		      	var coords = geoposition.coords;
		      	// Set itineraire
		    	findPath(coords);
		    });
		}

        function findPath(coords) {
            //using the direction service of google map api
            $scope.directionsService = new google.maps.DirectionsService();
            $scope.markers.splice(0, 1);

            $log.log($scope);

            var request = {
                origin: new google.maps.LatLng(coords.latitude, coords.longitude),
                destination: $scope.destination,
                travelMode: google.maps.DirectionsTravelMode.WALKING
            };
            //call the route method on google map api direction service with the request
            //which returns a response which can be directly provided to
            //directiondisplay object to display the route returned on the map
            $scope.directionsService.route(request, function(response, status) {

                if (status == google.maps.DirectionsStatus.OK) {
                    console.log(response);
                    directionsDisplay.setDirections(response);
                    console.log(response.routes.length);
                    $scope.distance = response.routes[0].legs[0].distance.value / 1000;

                }
            });
        }

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
