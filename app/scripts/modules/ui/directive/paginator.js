'use strict';

/**
 * @ngInject
 */
function paginator() {

	return {
		restrict: 'A', // Attribut
		scope: {items: '&'},
		templateUrl: '/views/directives/paginator.html',
	    replace: false,
	    compile: function compile() {
	      return {
	        pre: function preLink(scope) {
	          scope.pageSizeList = [10, 20, 50, 100];
	          scope.paginator = {
	            pageSize: 10,
	            currentPage: 0
	          };

	          scope.totalItems = function () {
	          	return scope.items().length;
	          };
	          scope.isFirstPage = function () {
	            return scope.paginator.currentPage === 0;
	          };
	          scope.isLastPage = function () {
	            return scope.paginator.currentPage >= scope.numberOfPages() - 1;
	          };
	          scope.incPage = function () {
	            if (!scope.isLastPage()) {
	              scope.paginator.currentPage++;
	            }
	          };
	          scope.decPage = function () {
	            if (!scope.isFirstPage()) {
	              scope.paginator.currentPage--;
	            }
	          };
	          scope.firstPage = function () {
	            scope.paginator.currentPage = 0;
	          };
	          scope.lastPage = function () {
	          	scope.paginator.currentPage = scope.numberOfPages() - 1;
	          };
	          scope.numberOfPages = function () {
	            return Math.ceil(scope.totalItems() / scope.paginator.pageSize);
	          };
	          scope.$watch('paginator.pageSize', function(newValue, oldValue) {
	            if (newValue !== oldValue) {
	              scope.firstPage();
	            }
	          });

	          // ---- Functions available in parent scope -----

	          scope.$parent.firstPage = function () {
	            scope.firstPage();
	          };
	          // Function that returns the reduced items list, to use in ng-repeat
	          scope.$parent.pageItems = function () {
	            var start = scope.paginator.currentPage * scope.paginator.pageSize;
	            var limit = scope.paginator.pageSize;
	            return scope.items().slice(start, start + limit);
	          };
	        },
	        post: function postLink() {}
	      };
	    }
	};

}

module.exports = paginator;