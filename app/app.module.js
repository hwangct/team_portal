var ctrl = angular.module('myApp.controllers', ['ngSanitize']);

ctrl.controller('candidatesController', ['$scope', 'submissions', 'positions', function($scope, submissions, positions) {
	$scope.submissions = submissions;
	$scope.positions = positions;
	$scope.newsubmissionurl = newSubmissionUrl("Submissions/CandidateSubmission2.aspx");
}]);
ctrl.controller('enomController', ['$scope', 'enoms', function($scope, enoms) {
	$scope.enoms = enoms;
}]);
ctrl.controller('taskOrdersController', ['$scope', 'taskOrders', function($scope, taskOrders) {
	$scope.taskOrders = taskOrders;
}]);

 // Create URL for new Submission 
function newSubmissionUrl(form) {
	var loc = window.location;
	var path_arr = window.location.pathname.split("/");
	var path = "";
	for (var x=0; x < path_arr.length - 2; x++) {
		if(path_arr[x].length > 0) {
			path += "/" + path_arr[x];
		}
	}
	url = window.location.origin + path + "/Lists/" + form;
	return url;
}

// Column filtering plugin
function WithColumnFilterCtrl(DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromSource('data.json')
        .withPaginationType('full_numbers')
        .withColumnFilter({
            aoColumns: [{
                type: 'text',
                bRegex: true,
                bSmart: true
            }, {
                type: 'text',
                bRegex: true,
                bSmart: true
            }, {
                type: 'text',
                bRegex: true,
                bSmart: true
            },{
                type: 'text',
                bRegex: true,
                bSmart: true
            },{
                type: 'select',
                bRegex: false,
                values: ['Yoda', 'Titi', 'Kyle', 'Bar', 'Whateveryournameis']
            }]
        });
    vm.dtColumns = [
        DTColumnBuilder.newColumn('title').withTitle('Position Title'),
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('family').withTitle('Family'),
        DTColumnBuilder.newColumn('level').withTitle('Level'),
        DTColumnBuilder.newColumn('site').withTitle('Site')
    ];
}