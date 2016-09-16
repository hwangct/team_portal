var candidates = angular.module('candidatesService', []);

candidates.factory('submissionsLibrary', ['$http', function($http, $q) {
	var submissions = [];
	var obj = {};
	
	return {
		getSubmissions: function() {

			var url = "../_vti_bin/listdata.svc/Submissions";
			return $http.get(url).then(function(result) {
				submissions = result.data.d.results;
				// Do something with enoms here?
				for (var x in submissions) {
					submissions[x].StatusDate = convertDate(submissions[x].StatusDate);
					submissions[x].Created = convertDate(submissions[x].Created);
					submissions[x].CreatedDays = getDaysinStatus(submissions[x].Created);
					submissions[x].Submitted = convertDate(submissions[x].Submitted);
					submissions[x].SubmittedDays = getDaysinStatus(submissions[x].Submitted);
					submissions[x].Selected = convertDate(submissions[x].Selected);
					submissions[x].SelectedDays = getDaysinStatus(submissions[x].Selected);
					submissions[x].SecurityValidated = convertDate(submissions[x].SecurityValidated);
					submissions[x].SecurityValidatedDays = getDaysinStatus(submissions[x].SecurityValidated);
					submissions[x].SubmittedPMO = convertDate(submissions[x].SubmittedToCustomerPMO);
					submissions[x].SubmittedPMODays = getDaysinStatus(submissions[x].SubmittedToCustomerPMO);
				}
				return submissions;
			});
		}
	};
}]);

candidates.factory('positionsLibrary', ['$http', function($http, $q) {
	var positions = [];
	var open_positions = [];
	var obj = {};
	
	return {
		getPositions: function() {
			if(open_positions.length > 0) {
				// Don't add more to the array until refresh?
				return open_positions;
			}
			
			var url = "../_vti_bin/listdata.svc/Positions";
			return $http.get(url).then(function(result) {
				positions = result.data.d.results;
				// Only return open positions;
				for (var x in positions) {
					if(positions[x].StatusValue !== "Filled") {
						// add open position
						positions[x].openDays = getDaysinStatus(convertDate(positions[x].OpenDate));
						open_positions.push(positions[x]);
					}
				}
				return open_positions;
			});
		}
	};
}]);
