angular.module('App').controller("listCtrl", function ($scope, movieService) {
	var promise = movieService.getMovies();
	promise.then(function (data) {
		$scope.movies = data.data;
	});
})