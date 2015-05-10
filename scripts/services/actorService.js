angular.module('App').service("actor", function ($http, $q) {
		var deferred = $q.defer();
		$http.get('data/actors-count.json').then(function (data) {
			deferred.resolve(data);
		});

		this.getBestActors = function () {
			return deferred.promise;
		};
})
