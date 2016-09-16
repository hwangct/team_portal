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

