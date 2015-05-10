angular.module('App').service("movieService", function ($http, $q) {
		var deferred = $q.defer();
		$http.get('../data/movies.json').then(function (data) {
			deferred.resolve(data);
		});

		this.getMovies = function () {
			return deferred.promise;
		};
})
