var candidates = angular.module('candidatesService', []);

candidates.factory('candidatesLibrary', ['$http','$q', function($http, $q) {
	// Initialize variables
	var obj = {
		open_pos_arr: [],
		pos_arr: [],
		candidate_arr: []
	};
	
	var pos;
	var sub;
	
	return {
		getCandidates: function() {
			var pos_url = "../_vti_bin/listdata.svc/Positions?$expand=Attachments";
			var sub_url = "../_vti_bin/listdata.svc/Submissions?$expand=PosnID";
			var path = "";
			var temp_html;
			pos =  $http.get(pos_url, {cache: false}); 
			sub = $http.get(sub_url, {cache: false});
			
			// Resolve all promises
			return $q.all([pos, sub]).then(function(values) {
				obj.pos_arr = values[0].data.d.results;
				obj.candidate_arr = values[1].data.d.results;
				obj.open_pos_arr = [];
				obj.substatus_arr = [];
				obj.enomstatus_arr = [];
				
				// Only return open positions;
				/*
				for (var x in obj.pos_arr) {
					if(obj.pos_arr[x].StatusValue !== "Filled") {
						// add open position
						obj.pos_arr[x].openDays = getDaysinStatus(convertDate(obj.pos_arr[x].OpenDate));

						for (var y = 0; y < obj.pos_arr[x].Attachments.results.length; y++) {
							obj.pos_arr[x].Attachments.results[y].url = getSPSitePath() + "/" + getSPAttachment( obj.pos_arr[x].Attachments.results[y]);// + '?Web=1';
						}					
						obj.pos_arr[x].pdlink = temp_html; 						
						obj.open_pos_arr.push(obj.pos_arr[x]);
					}
				}*/
				
				// Calculate days and dates for submisisons 
				for (var x in obj.candidate_arr) {	
					if (isSubmissionStatus(obj.candidate_arr[x].CandidateStatusValue)) {
						// If valid submission status, calculate values for the display
						obj.candidate_arr[x].StatusDate = convertDate(obj.candidate_arr[x].StatusDate);
						obj.candidate_arr[x].Created = convertDate(obj.candidate_arr[x].Created);
						obj.candidate_arr[x].CreatedDays = getDaysinStatus(obj.candidate_arr[x].Created);
						obj.candidate_arr[x].Submitted = convertDate(obj.candidate_arr[x].Submitted);
						obj.candidate_arr[x].SubmittedDays = getDaysinStatus(obj.candidate_arr[x].Submitted);
						obj.candidate_arr[x].Selected = convertDate(obj.candidate_arr[x].Selected);
						obj.candidate_arr[x].SelectedDays = getDaysinStatus(obj.candidate_arr[x].Selected);
						obj.candidate_arr[x].SecurityValidated = convertDate(obj.candidate_arr[x].SecurityValidated);
						obj.candidate_arr[x].SecurityValidatedDays = getDaysinStatus(obj.candidate_arr[x].SecurityValidated);
						obj.candidate_arr[x].SubmittedPMO = convertDate(obj.candidate_arr[x].SubmittedToCustomerPMO);
						obj.candidate_arr[x].SubmittedPMODays = getDaysinStatus(obj.candidate_arr[x].SubmittedToCustomerPMO);
						var incumbentStr = getString(obj.candidate_arr[x].IncumbentTO);
						obj.candidate_arr[x].IncumbentTO = incumbentStr;
						// Add to array
						obj.substatus_arr.push(obj.candidate_arr[x]);
					} else if (isEnomStatus(obj.candidate_arr[x].CandidateStatusValue)) {
						// If valid enom status, calculate values for the display
						obj.candidate_arr[x].StatusDate = convertDate(obj.candidate_arr[x].StatusDate);
						obj.candidate_arr[x].ResumeToCOR = convertDate(obj.candidate_arr[x].ResumeToCOR);
						obj.candidate_arr[x].ResumeToCORDays = getDaysinStatus(obj.candidate_arr[x].ResumeToCOR);
						obj.candidate_arr[x].SecurityInfoRequested = convertDate(obj.candidate_arr[x].SecurityInfoRequested);
						obj.candidate_arr[x].SecurityInfoRequestedDays = getDaysinStatus(obj.candidate_arr[x].SecurityInfoRequested);
						obj.candidate_arr[x].ResumeApproved  = convertDate(obj.candidate_arr[x].ResumeApproved );
						obj.candidate_arr[x].ResumeApprovedDays  = getDaysinStatus(obj.candidate_arr[x].ResumeApproved );
						obj.candidate_arr[x].TicketToPERSEC  = convertDate(obj.candidate_arr[x].TicketToPERSEC );
						obj.candidate_arr[x].TicketToPERSECDays  = getDaysinStatus(obj.candidate_arr[x].TicketToPERSEC );
						obj.candidate_arr[x].ENOMSubmitted  = convertDate(obj.candidate_arr[x].ENOMSubmitted );
						obj.candidate_arr[x].ENOMSubmittedDays  = getDaysinStatus(obj.candidate_arr[x].ENOMSubmitted );
						obj.candidate_arr[x].SecurityApproved  = convertDate(obj.candidate_arr[x].SecurityApproved );
						obj.candidate_arr[x].SecurityApprovedDays = getDaysinStatus(obj.candidate_arr[x].SecurityApproved );
						obj.candidate_arr[x].BriefingScheduled = convertDate(obj.candidate_arr[x].BriefingScheduled);
						obj.candidate_arr[x].BriefingScheduledDays = getDaysinStatus(obj.candidate_arr[x].BriefingScheduled);
						obj.candidate_arr[x].StartDate  = convertDate(obj.candidate_arr[x].StartDate );
						obj.candidate_arr[x].StartDateDays  = getDaysinStatus(obj.candidate_arr[x].StartDate );
						// Add to array
						obj.enomstatus_arr.push(obj.candidate_arr[x]);
					}
				}
				return obj;
			});
		}
	};
}]);

