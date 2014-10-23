'use strict';

/**
 * @ngInject
 */
function BusLinesController(BusLines, $log, $scope) {
	// ViewModel
	// var vm = this;
	
	//vm.stations = [];
	$scope.lines = [];
	$scope.showLoader = true;

	BusLines.get().then(function onSuccess(response) {
		var lines = response.data.opendata.answer.data.line;
		//vm.stations = stations;
		$scope.lines = lines;
		$scope.baseUrl = response.data.opendata.answer.data.baseurl;
		$log.log(lines);
	});

}

module.exports = BusLinesController;
