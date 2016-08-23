var sampleApp = angular.module('sampleApp', ['ui.router', 'datatables', 'candidatesService', 'enomsService', 'taskOrdersService', 'myApp.controllers']);

sampleApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/candidates');
	
	$stateProvider.
	  state('candidates', {
	  	url: '/candidates',
		  templateUrl: 'app/components/candidates/candidatesView.html',
		  controller: 'candidatesController',
		  resolve: {
		  	candidates: function(candidatesLibrary) {
		  		return candidatesLibrary.getCandidates();
		  	}
		  }
	  }).
	  state('enoms', {
	  	url: '/enoms',
		  templateUrl: 'app/components/enoms/enomsView.html',
		  controller: 'enomController',
		  resolve: {
		  	enoms: function(enomsLibrary) {
		  		return enomsLibrary.getEnoms();
		  	}
		  }
	  }).
	  state('taskorders', {
	  	url: '/taskOrders',
		  templateUrl: 'app/components/taskOrders/taskOrdersView.html',
		  controller: 'taskOrdersController',
		  resolve: {
		  	taskOrders: function(taskOrdersLibrary) {
		  		 return taskOrdersLibrary.getTaskOrders();
		  	}
		  }
	  });
});

