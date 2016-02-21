angular.module('App').controller("listCtrl", function ($scope, $http) {
	$http.get('data/movies.json').success(function(data) {
		$scope.movies = data;
	});
})
