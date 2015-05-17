angular.module('App').controller('directorsCtrl', function($scope, $http) {

	$http.get('data/directors-count.json').success(function(data) {
			var counts = data;
      var directors = Object.keys(counts);
      var stats = []
      for (key in counts) stats.push(counts[key]);

			$scope.directorsChartConfig = {
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
				    text: 'Director Counts in Top 250'
				},
				credits: {
				    enabled: false
				},
        xAxis: {
            title: {
                text: 'Directors'
            },
            categories: directors
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
