var taskOrders = angular.module('taskOrdersService', []);

taskOrders.factory('taskOrdersLibrary', function($http, $q) {
	var taskorders = [];
	var obj = {};

	return {
		getTaskOrders: function() {
			if(taskorders.length > 0) {
				var deferred = $q.defer();
				deferred.resolve(taskorders);
				return deferred.promise;
			}
			var url = "https://s2as.sharepoint.com/sites/sandbox/_vti_bin/listdata.svc/TaskOrders?$expand=Resume";
			return $http.get(url).then(function(result) {
				taskorders = result.data.d.results;
				for (var x in taskorders) {
					// Loop through each task order and create resume link
					//tasks[x].ResumeLinks = getResumeLink(tasks[x].Resume);
					taskorders[x].ResumeLinks = getResumeLink(taskorders[x].Resume);
				}
				return taskorders;
			});
		}
	};
});

function getResumeLink(resumes) {
	var temp_html = "";
		var html = "<ul><li>";
		var extension = "";
		var resumeArr = resumes.results;
		var name = "";
		var url = window.location.origin;
		for ( i = 0; i < resumeArr.length; i++) {
			// Parse the extension
			name = resumeArr[i].Name;
			extension = name.substr((~-name.lastIndexOf(".") >>> 0) + 2);
			// empty strings are files without extensions
			if (extension.length > 0) {
				extension = extension.toLowerCase();
				// Check to see if it is an image extension.  This example
				// does not cover all types.
				if ((extension === "docx") || (extension === "doc")) {
					var path = url + resumeArr[i].Path + '/' + resumeArr[i].Name + '?Web=1';
					temp_html = '<a class="popup-link" href="' + path + '">' + resumeArr[i].Title + '</a>';
				}
			}
			if (i == resumeArr.length - 1) {
				// Last item doesn't need a comma
				html += temp_html;
			} else {
				html += temp_html + ", ";
			}
		}

		return html + '</li></ul>';
}
