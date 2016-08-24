var ctrl = angular.module('myApp.controllers', ['ngSanitize']);

ctrl.controller('candidatesController', ['$scope', 'candidates', 'positions', function($scope, candidates, positions) {
	$scope.candidates = candidates.data.d.results;
	$scope.positions = positions.data.d.results;
}]);
ctrl.controller('enomController', ['$scope', 'enoms', function($scope, enoms) {
	$scope.enoms = enoms;
}]);
ctrl.controller('taskOrdersController', ['$scope', 'taskOrders', function($scope, taskOrders) {
	$scope.taskOrders = taskOrders;
}]);
