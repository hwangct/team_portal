// Convert oData to YYYY-MM-DD using momentjs and the Date library
function convertDate(odata_date) {
	var date = "";
	if ((odata_date !== '') && (odata_date !== undefined) && (odata_date !== null)) {
		date = new Date(parseInt(odata_date.substr(6)));
	} 	
	return moment(date).format("YYYY-MM-DD");
	
}

