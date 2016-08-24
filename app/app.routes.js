var sampleApp = angular.module('sampleApp', ['ui.router', 'datatables', 'candidatesService', 'enomsService', 'taskOrdersService', 'myApp.controllers']);

sampleApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/candidates');
	
	$stateProvider.
	  state('candidates', {
	  	url: '/candidates',
		  templateUrl: '/siteassets/team_portal/app/components/candidates/candidatesView.html',
		  controller: 'candidatesController',
		  resolve: {
		  	candidates: function(candidatesLibrary) {
		  		return candidatesLibrary.getCandidates();
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

