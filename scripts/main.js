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
