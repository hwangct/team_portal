var candidates = angular.module('candidatesService', []);

candidates.factory('candidatesLibrary', ['$http','$q', function($http, $q) {
	// Initialize variables
	var obj = {
		open_pos_arr: [],
		pos_arr: [],
		sub_arr: []
	};
	
	var pos;
	var sub;
	
	return {
		getCandidates: function() {
			var pos_url = "../_vti_bin/listdata.svc/Positions";
			var sub_url = "../_vti_bin/listdata.svc/Submissions";
			pos =  $http.get(pos_url, {cache: false}); 
			sub = $http.get(sub_url, {cache: false});
			
			// Resolve all promises
			return $q.all([pos, sub]).then(function(values) {
				obj.pos_arr = values[0].data.d.results;
				obj.sub_arr = values[1].data.d.results;
				
				// Only return open positions;
				for (var x in obj.pos_arr) {
					if(obj.pos_arr[x].StatusValue !== "Filled") {
						// add open position
						obj.pos_arr[x].openDays = getDaysinStatus(convertDate(obj.pos_arr[x].OpenDate));
						obj.open_pos_arr.push(obj.pos_arr[x]);
					}
				}
				
				// Calculate days and dates for submisisons 
				for (var x in obj.sub_arr) {
					obj.sub_arr[x].StatusDate = convertDate(obj.sub_arr[x].StatusDate);
					obj.sub_arr[x].Created = convertDate(obj.sub_arr[x].Created);
					obj.sub_arr[x].CreatedDays = getDaysinStatus(obj.sub_arr[x].Created);
					obj.sub_arr[x].Submitted = convertDate(obj.sub_arr[x].Submitted);
					obj.sub_arr[x].SubmittedDays = getDaysinStatus(obj.sub_arr[x].Submitted);
					obj.sub_arr[x].Selected = convertDate(obj.sub_arr[x].Selected);
					obj.sub_arr[x].SelectedDays = getDaysinStatus(obj.sub_arr[x].Selected);
					obj.sub_arr[x].SecurityValidated = convertDate(obj.sub_arr[x].SecurityValidated);
					obj.sub_arr[x].SecurityValidatedDays = getDaysinStatus(obj.sub_arr[x].SecurityValidated);
					obj.sub_arr[x].SubmittedPMO = convertDate(obj.sub_arr[x].SubmittedToCustomerPMO);
					obj.sub_arr[x].SubmittedPMODays = getDaysinStatus(obj.sub_arr[x].SubmittedToCustomerPMO);
				}
				return obj;
			});
		}
	};
}]);

