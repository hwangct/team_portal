var candidates = angular.module('candidatesService', []);

candidates.factory('candidatesLibrary', ['$http', function($http) {
	return {
		getCandidates: function() {
			//var url = "https://s2as.sharepoint.com/sites/sandbox/_vti_bin/listdata.svc/Submission";
			var url = "https://s2as.sharepoint.com/WarRoom/Emerald/Emerald_Teammates/_vti_bin/listdata.svc/Submissions";
			return $http.get(url);
		}
	};
}]);
