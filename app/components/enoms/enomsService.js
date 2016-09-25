var enoms = angular.module('enomsService', []);

enoms.factory('enomsLibrary', function($http, $q) {
	var enoms = [];
	var obj = {};
	
	return {
    getEnoms: function() {
	    var url = "../_vti_bin/listdata.svc/Submissions?$expand=PosnID";
	  	return $http.get(url).then(function(result) {
				enoms = result.data.d.results;
				for (var x in enoms) {
					// Loop through each enom and convert the dates
					enoms[x].StatusDate = convertDate(enoms[x].StatusDate);
					enoms[x].ResumeToCOR = convertDate(enoms[x].ResumeToCOR);
					enoms[x].ResumeToCORDays = getDaysinStatus(enoms[x].ResumeToCOR);
					enoms[x].SecurityInfoRequested = convertDate(enoms[x].SecurityInfoRequested);
					enoms[x].SecurityInfoRequestedDays = getDaysinStatus(enoms[x].SecurityInfoRequested);
					enoms[x].ResumeApproved  = convertDate(enoms[x].ResumeApproved );
					enoms[x].ResumeApprovedDays  = getDaysinStatus(enoms[x].ResumeApproved );
					enoms[x].TicketToPERSEC  = convertDate(enoms[x].TicketToPERSEC );
					enoms[x].TicketToPERSECDays  = getDaysinStatus(enoms[x].TicketToPERSEC );
					enoms[x].ENOMSubmitted  = convertDate(enoms[x].ENOMSubmitted );
					enoms[x].ENOMSubmittedDays  = getDaysinStatus(enoms[x].ENOMSubmitted );
					enoms[x].SecurityApproved  = convertDate(enoms[x].SecurityApproved );
					enoms[x].SecurityApprovedDays = getDaysinStatus(enoms[x].SecurityApproved );
					enoms[x].BriefingScheduled = convertDate(enoms[x].BriefingScheduled);
					enoms[x].BriefingScheduledDays = getDaysinStatus(enoms[x].BriefingScheduled);
					enoms[x].StartDate  = convertDate(enoms[x].StartDate );
					enoms[x].StartDateDays  = getDaysinStatus(enoms[x].StartDate );
					
				}
				return enoms;
			});
		}
	};
});

