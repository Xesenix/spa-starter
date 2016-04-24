(function() {
	var flotApp = angular.module("app", []);
	
	flotApp.config(['$httpProvider', '$compileProvider', function($httpProvider, $compileProvider) {
		$httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		
		$httpProvider.defaults.transformRequest = [function(data) {
			return angular.isObject(data) && String(data) !== '[object File]' ? UrlQuery.objectToQueryString(data) : data;
		}];
		
		$compileProvider.debugInfoEnabled(false);
	}]);
	
	flotApp.controller('appMainController', ['$scope', function($scope) {
		$scope.test = "Hello world!";
	}]);
})();