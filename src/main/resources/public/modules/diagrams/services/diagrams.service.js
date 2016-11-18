'use strict';

//service used to communicate with REST endpoints
angular.module('diagrams').factory('Diagrams', ['$resource', '$http', 
	function($resource, $http) {
		return $resource('/diagrams/:id', { id: '@id' }, {
			query: {
				isArray: false,
			}
		});
	}
]);