// Convert oData to YYYY-MM-DD using momentjs and the Date library
function convertDate(odata_date) {
	var date = "";
	// Check for valid odata_date
	if ((odata_date !== '') && (odata_date !== undefined) && (odata_date !== null)) {
		date = new Date(parseInt(odata_date.substr(6)));
		return moment(date).format("YYYY-MM-DD");
	} else {
		return "";
	}
}

// Return number of days between a specified date and today
function getDaysinStatus(odata_date) {
	var days = 0;
	var today = moment();
	
	// Calculate if the date passed in was a valid date object
	if ((odata_date !== '') && (odata_date !== undefined) && (odata_date !== null)) {
		days = today.diff(odata_date, 'days');
	}
	
	return days;
}

// Return path of the current subsite URL (equivalent to _spPageContextInfo.siteAbsoluteUrl and _spPageContextInfo.webServerRelativeUrl)
function getSPSitePath() {
	var url = window.location.origin;
	var path_arr = window.location.pathname.split("/");
	var path = "";
	// This part needs to be tested
	for (var x = 0; x < path_arr.length - 2; x++) {
		// Only append valid strings
		if (path_arr[x]) {
			path += "/" + path_arr[x];
		}
	}
	return (url+path);
}

// Return path to the project's assets, based on the current page's extension
// Only works if the index page is index_<mode>.aspx
function getSPProjectAssets() {
	var root =  window.location.origin;
	var pathname = window.location.pathname;
	var projectname = pathname.substring(pathname.lastIndexOf('/')-1);
	var filename = pathname.substring(pathname.lastIndexOf('/')+1);
	var file_arr = filename.split(".aspx");
	var mode = file_arr[0].split("_");
	var url = "";
	
	if (mode.length > 1) {
		// Not production mode
		url = root + "/siteassets/team_portal_" + mode[1];
	} else {
		// Production mode
		url = root + "/siteassets/team_portal";
	}
	return url;
}
// Return path to attachment
function getSPAttachment(attachment) {
	var url = "";
	// Check for empty object
	if (_.isEmpty(attachment)) {
		console.log("Empty object to attachment");
	} else {
		url = "Lists/" + attachment.EntitySet + "/Attachments/" + attachment.ItemId + "/" + attachment.Name;
	}
	return url;
}

// Return path to details page
function getSPDetails(listname, id) {
	var url = "";
	// Check for empty object
	url = "Lists/" + listname + "/DispForm.aspx?ID=" + id ;
	return url;
}

// Checks for null and converts to string
function getString(obj) {
	if (_.isNull(obj)) {
		return "";
	} else {
		return obj;
	}
}

// Checks if the status is Submission Status
function isSubmissionStatus(status) {
	var submission_arr = ['Submitted', 'Selected', 'Security Validated', 'Submitted to Customer PMO', 'Customer PMO Approved'];
	if (status){
		for (var x in submission_arr) {
			if(status.toLowerCase() === submission_arr[x].toLowerCase()) {
				return true;
			}
		}
	}
	return false;
}

// Checks if the status is Enom Status
function isEnomStatus(status) {
	var submission_arr = ['Submitted to customer PMO Security', 'Adjudicated', 'Scheduled', 'Indoc Date'];
	if (status){
		for (var x in submission_arr) {
			if(status.toLowerCase() === submission_arr[x].toLowerCase()) {
				return true;
			}
		}
	}
	return false;
}