angular.module('App').controller('movieCtrl', function($scope, movieService, $routeParams) {
    var movieId = $routeParams.movieId;
		var promise = movieService.getMovies();
		promise.then(function (data) {
			var movies = data.data;
			movies.forEach(function(movie) {
				if(movie['imdbid'] == movieId) {
					$scope.movie = movie;

          rating_table = movie['rating_table']
          var votes  = rating_table.filter(function(element, index, array) {
            return !(index % 2)
          }).map(Number);

          var ratings  = rating_table.filter(function(element, index, array) {
            return (index % 2)
          }).map(Number);

					$scope.chartConfig = {
						options: {
						  chart: {
							  type: 'column',
                spacingRight: 20,
                spacingLeft: 0,
                spacingBottom:0,
                zoomType: 'xy'
						  }
						},
						title: {
						    text: 'User Ratings of ' + movie['title']
						},
						credits: {
						    enabled: false
						},
            xAxis: {
                title: {
                    text: 'Ratings'
                },
                categories: ratings
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
						series: [{
						    name: 'Votes',
						    data: votes,
                color: '#00bfa5'
						}]
					}
				}
        return;
			});

      $scope.showDirectorStats = function(director) {

      };

		});
});
