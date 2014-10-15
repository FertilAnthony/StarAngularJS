'use strict';

/**
 * @ngInject
 */
function customLoader($log) {

	return {
		restrict: 'E', // Element
		template: 
		'<div id="loaderDiv" class="customLoader" ng-show="{{ vm.showLoader }}">' +
          '<img src="http://preloaders.net/preloaders/166/Pacman.gif" class="ajax-loader"/>' +
        '</div>',
        link:
		function (vm, $element) {
			$log.log(vm);
	        vm.$on('loaderShow', function () {
	            vm.showLoader = true;
	            return $element;
	        });
	        vm.$on('loaderHide', function () {
	            vm.showLoader = false;
	            return $element;
	        });
    	}
    };

}

module.exports = customLoader;
