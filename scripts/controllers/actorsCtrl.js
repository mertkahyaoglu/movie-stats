angular.module('App').controller('actorsCtrl', function($scope, $http) {

		$http.get('data/actors-count.json').success(function(data) {
				var counts = data;
				var actors = Object.keys(counts);
		    var stats = []
		    for (key in counts) stats.push(counts[key]);

				$scope.actorsChartConfig = {
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
					    text: 'Actor Counts in Top 250'
					},
					credits: {
					    enabled: false
					},
		      xAxis: {
		          title: {
		              text: 'Actors'
		          },
		          categories: actors
		      },
		      yAxis: {
		          title: {
		              text: 'Count'
		          }
		      },
					series: [{
					    name: 'Number of movies',
					    data: stats,
		          color: '#00bfa5'
					}]
				}

		});

});
