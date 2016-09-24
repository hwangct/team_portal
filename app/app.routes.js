var sampleApp = angular.module('sampleApp', ['ngMaterial', 'ui.router', 'datatables', 'datatables.columnfilter', 'positionsService', 'candidatesService', 'enomsService', 'taskOrdersService', 'myApp.controllers']);

sampleApp.controller('dialogController', dialogController);
// Modal functions
function dialogController ($scope, $mdDialog) {
	$scope.status = '';
	/*
  $scope.showAlert = function(ev) {
     $mdDialog.show(
      $mdDialog.alert()
       .parent(angular.element(document.querySelector('#dialogContainer')))
       .clickOutsideToClose(true)
       .title('TutorialsPoint.com')
       .textContent('Welcome to TutorialsPoint.com')
       .ariaLabel('Welcome to TutorialsPoint.com')
       .ok('Ok!')
       .targetEvent(ev)
     );
  };

  $scope.showConfirm = function(event) {
   var confirm = $mdDialog.confirm()
    .title('Are you sure to delete the record?')
    .textContent('Record will be deleted permanently.')
    .ariaLabel('TutorialsPoint.com')
    .targetEvent(event)
    .ok('Yes')
    .cancel('No');
    $mdDialog.show(confirm).then(function() {
      $scope.status = 'Record deleted successfully!';
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };
*/
  $scope.showEnomStatus = function(event, x) {
   $mdDialog.show({
    clickOutsideToClose: true,
    scope: $scope,        
    preserveScope: true,           
    templateUrl: '/SiteAssets/team_portal_dev/app/templates/enomStatus.tmpl.html',
    parent: angular.element(document.body),
    fullscreen: $scope.customFullscreen,
    locals: {dataToPass: x},
    controller: function DialogController($scope, dataToPass) {
    	$scope.modalEnom = dataToPass;
		  $scope.closeDialog = function() {
		    $mdDialog.hide();
		  };
    }
   });
  };
  
  $scope.showCandidateStatus = function(event, x) {
   $mdDialog.show({
    clickOutsideToClose: true,
    scope: $scope,        
    preserveScope: true,           
    templateUrl: '/SiteAssets/team_portal_dev/app/templates/candidateStatus.tmpl.html',
    parent: angular.element(document.body),
    fullscreen: $scope.customFullscreen,
    locals: {dataToPass: x},
    controller: function DialogController($scope, dataToPass) {
    	$scope.modalCandidate = dataToPass;
		  $scope.closeDialog = function() {
		    $mdDialog.hide();
		  };
    }
   });
  };
} 

// Datatables controller
sampleApp.controller('dTableCtrl', dTableController);
// Modal functions
function dTableController ($scope, DTOptionsBuilder) {
	$scope.dtOptions = DTOptionsBuilder.newOptions()
	  .withPaginationType('full_numbers')
	  .withOption('aaSorting', [1, 'asc']);
}
sampleApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/positions');
	
	$stateProvider.
		state('positions', {
	  	url: '/positions',
		  templateUrl: '/siteassets/team_portal_dev/app/components/positions/positionsView.html',
		  controller: 'positionsController',
		  resolve: {
		  	positions: function(positionsLibrary) {
		  		return positionsLibrary.getPositions();
		  	}
		  }
	  }).
	  state('candidates', {
	  	url: '/candidates',
		  templateUrl: '/siteassets/team_portal_dev/app/components/candidates/candidatesView.html',
		  controller: 'candidatesController',
		  resolve: {
		  	candidates: function(candidatesLibrary) {
		  		return candidatesLibrary.getCandidates();
		  	}
		  }
	  }).
	  state('enoms', {
	  	url: '/enoms',
		  templateUrl: '/siteassets/team_portal_dev/app/components/enoms/enomsView.html',
		  controller: 'enomController',
		  resolve: {
		  	enoms: function(enomsLibrary) {
		  		return enomsLibrary.getEnoms();
		  	}
		  }
	  }).
	  state('taskorders', {
	  	url: '/taskOrders',
		  templateUrl: '/siteassets/team_portal_dev/app/components/taskOrders/taskOrdersView.html',
		  controller: 'taskOrdersController',
		  resolve: {
		  	taskOrders: function(taskOrdersLibrary) {
		  		 return taskOrdersLibrary.getTaskOrders();
		  	}
		  }
	  });
});
      
