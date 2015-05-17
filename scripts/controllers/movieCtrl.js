angular.module('App').controller('movieCtrl', function($scope, $http, $routeParams) {
    var movieId = $routeParams.movieId;
    $http.get('data/movies.json').success(function(data) {
			var movies = data;
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
							  type: 'bar',
                spacingRight: 20,
                spacingLeft: 0,
                spacingBottom:0,
                zoomType: 'xy'
						  }
						},
						title: {
						    text: 'Ratings of ' + movie['title'] + " ("+movie['rating']+")"
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
                    text: 'Votes'
                }
            },
						series: [{
						    name: 'User Votes',
						    data: votes,
                color: '#00bfa5'
						}]
					}
				}
        return;
			});

      $scope.showDirectorStats = function(director) {
        var data;
        $scope.chartConfig.series = data;
      };

		});
});
