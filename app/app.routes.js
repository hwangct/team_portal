var sampleApp = angular.module('sampleApp', ['ngMaterial', 'ui.router', 'datatables', 'datatables.columnfilter', 'candidatesService', 'enomsService', 'taskOrdersService', 'myApp.controllers']);

sampleApp.controller('dialogController', dialogController);
// Modal functions
function dialogController ($scope, $mdDialog) {
	$scope.status = '';
	$scope.items = [1,2,3,4,5];
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

  $scope.showCustom = function(event) {
   $mdDialog.show({
    clickOutsideToClose: true,
    scope: $scope,        
    preserveScope: true,           
    templateUrl: '/SiteAssets/team_portal_dev/app/newSubmission.tmpl.html',
    parent: angular.element(document.body),
    fullscreen: $scope.customFullscreen,
    controller: function DialogController($scope, $mdDialog) {
		  $scope.closeDialog = function() {
		    $mdDialog.hide();
		  };
    }
   });
  };
} 
      
sampleApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/candidates');
	
	$stateProvider.
	  state('candidates', {
	  	url: '/candidates',
		  templateUrl: '/siteassets/team_portal_dev/app/components/candidates/candidatesView.html',
		  controller: 'candidatesController',
		  resolve: {
		  	submissions: function(submissionsLibrary) {
		  		return submissionsLibrary.getSubmissions();
		  	},
	  		positions: function(positionsLibrary) {
	  			return positionsLibrary.getPositions();
	  		}
		  }
	  }).
	  state('enoms', {
	  	url: '/enoms',
		  templateUrl: '/siteassets/team_portal/app/components/enoms/enomsView.html',
		  controller: 'enomController',
		  resolve: {
		  	enoms: function(enomsLibrary) {
		  		return enomsLibrary.getEnoms();
		  	}
		  }
	  }).
	  state('taskorders', {
	  	url: '/taskOrders',
		  templateUrl: '/siteassets/team_portal/app/components/taskOrders/taskOrdersView.html',
		  controller: 'taskOrdersController',
		  resolve: {
		  	taskOrders: function(taskOrdersLibrary) {
		  		 return taskOrdersLibrary.getTaskOrders();
		  	}
		  }
	  });
});
      
