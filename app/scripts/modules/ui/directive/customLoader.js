'use strict';

/**
 * @ngInject
 */
function customLoader($rootScope) {

	return function ($scope, element, attrs) {
        $scope.$on('loaderShow', function () {
            return element.show();
        });
        return $scope.$on('loaderHide', function () {
            return element.hide();
        });
    };

}

module.exports = customLoader;
