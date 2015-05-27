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
        when('/directors', {
	        templateUrl: 'views/directors.html',
	        controller: 'directorsCtrl'
	      }).
        when('/actors', {
	        templateUrl: 'views/actors.html',
	        controller: 'actorsCtrl'
	      }).
        when('/years', {
	        templateUrl: 'views/years.html',
	        controller: 'yearsCtrl'
	      }).
	      otherwise({
	        redirectTo: '/'
	      });
		}])
