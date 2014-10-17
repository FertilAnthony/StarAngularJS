'use strict';

/**
 * @ngInject
 */
function customLoader() {

	return {
		restrict: 'E', // Element
		template: 
		'<div id="loaderDiv" class="customLoader" ng-show="showLoader">' +
          '<img src="http://preloaders.net/preloaders/166/Pacman.gif" class="ajax-loader"/>' +
        '</div>',
        link:
		function ($scope, $element) {
	        $scope.$on('loaderShow', function () {
	            $scope.showLoader = true;
	            return $element;
	        });
	        $scope.$on('loaderHide', function () {
	            $scope.showLoader = false;
	            return $element;
	        });
    	}
    };

}

module.exports = customLoader;
