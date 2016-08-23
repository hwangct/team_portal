var enoms = angular.module('enomsService', []);

enoms.factory('enomsLibrary', function($http, $q) {
	var enoms = [];
	var obj = {};
	
	return {
    getEnoms: function() {
    	if(enoms.length > 0) {
				var deferred = $q.defer();
				deferred.resolve(getEnoms);
				return deferred.promise;
			}
      var url = "https://s2as.sharepoint.com/WarRoom/Emerald/Emerald_Teammates/_vti_bin/listdata.svc/Submissions";
    	return $http.get(url).then(function(result) {
				enoms = result.data.d.results;
				for (var x in enoms) {
					// Loop through each enom and convert the dates
					enoms[x].ResumeToCOR = convertDate(enoms[x].ResumeToCOR);
					enoms[x].SecurityInfoRequested = convertDate(enoms[x].SecurityInfoRequested);
					enoms[x].ResumeApproved  = convertDate(enoms[x].ResumeApproved );
					enoms[x].TicketToPERSEC  = convertDate(enoms[x].TicketToPERSEC );
					enoms[x].ENOMSubmitted  = convertDate(enoms[x].ENOMSubmitted );
					enoms[x].SecurityApproved  = convertDate(enoms[x].SecurityApproved );
					enoms[x].BriefingScheduled = convertDate(enoms[x].BriefingScheduled);
					enoms[x].StartDate  = convertDate(enoms[x].StartDate );
				}
				return enoms;
			});
		}
	};
});

function convertDate(odata_date) {
	var date = "";
	if ((odata_date != '') && (odata_date != undefined)) {
		date = new Date(parseInt(odata_date.substr(6)));
	} 
	
	return date;
}
