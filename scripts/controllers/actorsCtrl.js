angular.module('App').controller('actorsCtrl', function($scope, $http) {

		$http.get('data/actors-count.json').success(function(data) {
				var counts = data;
				var stats = []
				for(var key in counts) {
					if(counts[key] > 7) {
						stats.push({
								name: key,
								y: counts[key],
								sliced: true,
								selected: true
						})
						continue
					}
					var kv = []
					kv.push(key);
					kv.push(counts[key]);
					stats.push(kv);
				}

				$scope.actorsChartConfig = {
					options: {
					  chart: {
							plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false
					  }
					},
					title: {
					    text: 'Actor Counts in Top 250'
					},
					credits: {
					    enabled: false
					},
					plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    },
	                    connectorColor: 'silver'
	                }
	            }
	        },
					series: [{
							type: "pie",
					    name: 'Number of movies',
					    data: stats
					}]
				}

		});

});
