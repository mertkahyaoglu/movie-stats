var app = angular.module("App", ['ngRoute', "highcharts-ng"]);

app.config(['$routeProvider',
  	function($routeProvider) {
	    $routeProvider.
	      when('/', {
	        templateUrl: 'views/list.html',
	        controller: 'listCtrl'
	      }).
	      when('/movie/:movieId', {
	        templateUrl: 'views/movie.html',
	        controller: 'movieCtrl'
	      }).
        when('/about', {
	        templateUrl: 'views/about.html',
	        controller: 'aboutCtrl'
	      }).
	      otherwise({
	        redirectTo: '/'
	      });
		}])

.service("movieService", function ($http, $q) {
		var deferred = $q.defer();
		$http.get('../data/movies.json').then(function (data) {
			deferred.resolve(data);
		});

		this.getMovies = function () {
			return deferred.promise;
		};
})

.controller("listCtrl", function ($scope, movieService) {
		var promise = movieService.getMovies();
		promise.then(function (data) {
			$scope.movies = data.data;
		});
})

.controller('movieCtrl', function($scope, movieService, $routeParams) {
    var movieId = $routeParams.movieId;
		var promise = movieService.getMovies();
		promise.then(function (data) {
			var movies = data.data;
			movies.forEach(function(movie) {
				if(movie['imdbid'] == movieId) {
					$scope.movie = movie;

          $scope.chartConfig = {
              options: {
                chart: {
                    type: 'bar'
                }
              },
              series: [{
                data: [10, 15, 12, 8, 7]
              }],
              title: {
                text: movie.title
              }
          }
          return;
				}
			});

      $scope.showDirectorStats = function(director) {

      };

		});
});
