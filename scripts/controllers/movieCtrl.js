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
							  type: 'column',
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

          $scope.showDirectorStats = function() {
            $http.get('data/directors-cast.json').success(function(data) {
                var dc = data[movie['director']];
                var actors_count = {};
                var actors_movies = {};

                dc.forEach(function(item) {
                  if(item[0] in actors_count) {
                    actors_count[item[0]] += 1;
                    actors_movies[item[0]].push(item[1]);
                  }else {
                    actors_count[item[0]] = 1;
                    actors_movies[item[0]] = [item[1]]
                  }
                });

                for(var key in actors_count) {
                  if(actors_count[key] < 2) {
                    delete actors_count[key];
                  }
                }

                var counts = [];
                for(key in actors_count) {
                  counts.push(actors_count[key]);
                }

                $scope.chartConfig.options.chart.type = "column"
                $scope.chartConfig.xAxis.title.text = "Actors"
                $scope.chartConfig.yAxis.title.text = "Number of movies"
                $scope.chartConfig.xAxis.categories = Object.keys(actors_count);
                $scope.chartConfig.title.text = "Director's Most Selected Actors"
                $scope.chartConfig.series[0].data = counts
                $scope.chartConfig.series[0].name = "Count"
            });
          };

          $scope.showActorStats = function() {
            $http.get('data/cast-genres.json').success(function(data) {
                var cg = data;
                $scope.chartConfig.title.text = "Actor's Most Played Genres"
                $scope.chartConfig.series = [];
            });
          };
          return
				}
			});

		});
});
