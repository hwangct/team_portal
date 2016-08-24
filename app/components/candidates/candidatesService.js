var candidates = angular.module('candidatesService', []);

candidates.factory('candidatesLibrary', ['$http', function($http) {
	return {
		getCandidates: function() {
			//var promise1 = $http.get("../_vti_bin/listdata.svc/Submissions");
			//var promise2 = $http.get("../_vti_bin/listdata.svc/Positions");
			
			//return $q.all([promise1, promise2]);
			return $http.get("../_vti_bin/listdata.svc/Submissions");
		}
	};
}]);

candidates.factory('positionsLibrary', ['$http', function($http) {
	return {
		getPositions: function() {
			//var promise1 = $http.get("../_vti_bin/listdata.svc/Submissions");
			//var promise2 = $http.get("../_vti_bin/listdata.svc/Positions");
			
			//return $q.all([promise1, promise2]);
			return $http.get("../_vti_bin/listdata.svc/Positions");
		}
	};
}]);
