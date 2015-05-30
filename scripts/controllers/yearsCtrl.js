angular.module('App').controller('yearsCtrl', function($scope, $http) {

		$http.get('data/years-count.json').success(function(data) {
				var counts = data;
				var stats = []
				for(var key in counts) {
					var kv = []
					kv.push(key);
					kv.push(counts[key]);
					stats.push(kv);
				}

				$scope.yearsChartConfig = {
					options: {
					  chart: {
							type: "column",
							spacingRight: 20,
							spacingLeft: 0,
							spacingBottom:0,
							zoomType: 'xy'
					  }
					},
					title: {
					    text: 'Most Successful Years'
					},
					xAxis: {
							allowDecimals: false,
							title: {
									text: 'Years'
							},
							categories: Object.keys(counts)
					},
					yAxis: {
							allowDecimals: false,
							title: {
									text: 'Counts'
							},
					},
					credits: {
					    enabled: false
					},
					series: [{
							type: "column",
					    name: 'Number of movies in Top 250',
					    data: stats
					}]
				}

		});

});
