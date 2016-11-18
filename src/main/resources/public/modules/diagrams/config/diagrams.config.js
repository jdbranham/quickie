// Configuring the module
angular.module('diagrams').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Diagrams', '/diagrams', 'dropdown', '/diagrams', true);
		Menus.addSubMenuItem('topbar', '/diagrams', 'List', 'diagrams', 'diagrams', true);
		Menus.addSubMenuItem('topbar', '/diagrams', 'Create', 'diagrams/create', 'createDiagram', true);
	}
]);