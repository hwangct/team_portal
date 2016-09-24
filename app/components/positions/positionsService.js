var positions = angular.module('positionsService', []);

positions.factory('positionsLibrary', function($http, $q) {
	// Initialize variables
	var open_pos_arr = [];
	var pos_arr = [];
	
	var enoms = [];
	return {
		getPositions: function() {
			var pos_url = "../_vti_bin/listdata.svc/Positions?$expand=Attachments";
			var path = "";
			var temp_html;
			return $http.get(pos_url).then(function(result) {
				//return result.data.d.results;
				pos_arr = result.data.d.results;
				
				// Only return open positions;
				for (var x in pos_arr) {
					if(pos_arr[x].StatusValue !== "Filled") {
						// add open position
						pos_arr[x].openDate = convertDate(pos_arr[x].openDate);
						pos_arr[x].openDays = getDaysinStatus(convertDate(pos_arr[x].OpenDate));

						for (var y = 0; y < pos_arr[x].Attachments.results.length; y++) {
							pos_arr[x].Attachments.results[y].url = getSPSitePath() + "/" + getSPAttachment( pos_arr[x].Attachments.results[y]);// + '?Web=1';
						}					
						pos_arr[x].pdlink = temp_html; 						
						open_pos_arr.push(pos_arr[x]);
					}
				}
				return open_pos_arr;
			});
		}
	};
});

