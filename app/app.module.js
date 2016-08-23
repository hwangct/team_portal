var ctrl = angular.module('myApp.controllers', ['ngSanitize']);

ctrl.controller('candidatesController', ['$scope', 'candidates', function($scope, candidates) {
	$scope.candidates = candidates.data.d.results;
}]);
ctrl.controller('enomController', ['$scope', 'enoms', function($scope, enoms) {
	$scope.enoms = enoms;
}]);
ctrl.controller('taskOrdersController', ['$scope', 'taskOrders', function($scope, taskOrders) {
	$scope.taskOrders = taskOrders;
}]);
