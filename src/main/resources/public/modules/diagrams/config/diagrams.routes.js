'use strict';

// Setting up route
angular.module('diagrams').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider.
		state('diagrams', {
			url: '/diagrams',
			templateUrl: 'modules/diagrams/views/list.view.html'
		}).
		state('createDiagram', {
			url:'/diagrams/create',
			templateUrl: 'modules/diagrams/views/edit.view.html'
		}).
		state('editDiagram', {
			url:'/diagrams/:id/edit',
			templateUrl: 'modules/diagrams/views/edit.view.html'
		});
	}
]);