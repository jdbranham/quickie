'use strict';


angular.module('diagrams').controller('DiagramsController', ['$scope', '$rootScope', '$filter', '$log', '$stateParams', '$location', 'Authentication', 'Diagrams', 'notify',  
	function($scope, $rootScope, $filter, $log, $stateParams, $location, Authentication, Diagrams, notify) {
		// This provides Authentication context.
		$rootScope.title='Diagrams';
		$scope.authentication = Authentication;
		$scope.$location = $location;
		$scope.loading = [];
		$scope.console = '';
		$scope.logs = [];
		
		notify.config({
			duration: 3000,
			position: 'left',
			maximumOpen: 3
		});
		
		Diagrams.query().$promise.then(function(response){
			$scope.items = response.content;
		});
		
		$scope.addLoader = function(id){
			$scope.loading.push(id);
		};
		
		$scope.removeLoader = function(id){
			var loaderIndex = $scope.loading.indexOf(id);
			if(loaderIndex > -1){
				$scope.loading.splice(loaderIndex, 1);
			}
		};
		
		$scope.save = function() {
			$scope.addLoader('save');
			// Create new object
			var scenario = new Diagrams ($scope.item);

			// Redirect after save
			scenario.$save(function(response) {
				$location.path('diagrams/' + response.id + '/edit');
				$scope.removeLoader('save');
				notify({message: 'Saved', classes: ['bg-success']});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				$scope.removeLoader('save');
				notify({message: 'Failed to save', classes: ['bg-danger']});
			});
		};
		
		$scope.duplicate = function(diagram){
			$scope.item = diagram;
			$scope.item.id = null;
			$scope.item.name = $scope.item.name + ' COPY';
			$scope.save();
		}
		
		$scope.cancel = function(){
			$location.path('/diagrams');
		};
		
		// Find existing item
		$scope.findOne = function() {
			Diagrams.get({
				id: $stateParams.id
			}).$promise.then(function(item){
				$scope.item = item;
				mermaidAPI.initialize($scope.mermaidInit);
				mermaidAPI.parseError = $scope.handleParseError.bind(this);
				$scope.updateDiagram();
			});
		};
		
		$scope.handleParseError = function(err, hash){
			$scope.error = 'Failed to parse diagram definition\n' + err;
		}
		
		$scope.log = function(msg){
			$scope.logs.push(msg);
			$scope.console = angular.toJson($scope.logs, true);
		}
		$scope.clearLogs = function(){
			$scope.logs = [];
			$scope.console = angular.toJson($scope.logs, true);
		}
		
		$scope.deleteItem = function(item){
			var _item = new Diagrams(item);
			_item.$delete().then(function(response){
				var itemIndex = $scope.items.indexOf(item);
				if (itemIndex > -1){
					$scope.items.splice(itemIndex, 1);
				}
			});
		};
		
		$scope.selectAll = function(value){
			var filteredItems = $filter('filter')($scope.items, $scope.searchText);
			for(var i=0; i<filteredItems.length; i++){
				filteredItems[i].checked = value;
			}
		};
		
		$scope.updateDiagram = function(){
			var graphDefinition = $scope.item.script || 'graph TD; A-->B; A-->C; B-->D; C-->D;';
			var diagramType = mermaidAPI.detectType(graphDefinition);
			var diagramContainerId = 'diagramContainer';
			var diagramContainer = $('#'+diagramContainerId);
			diagramContainer.children().remove();
		    
			var renderCallback = function (svgCode, bindFunctions){
				if(svgCode == '') {
					diagramContainer.html('There was a problem rendering the graph');
				} else {
					diagramContainer.html(svgCode);
				}
			};
			// if parsing the graph definition fails, the error handler will be called but the renderCallback() may also still be called.
			mermaidAPI.render('diagram', graphDefinition, renderCallback);
		};
		
		$scope.mermaidInit = {
			logLevel: 3, //1:debug, 2:info, 3:warn, 4:error, 5:fatal
	    	cloneCssStyles: false, // - This options controls whether or not the css rules should be copied into the generated svg
			startOnLoad: false, // - This options controls whether or mermaid starts when the page loads
			arrowMarkerAbsolute: true, // - This options controls whether or arrow markers in html code will be absolute paths or an anchor, #. This matters if you are using base tag settings.
			flowchart: {
				htmlLabels: true,
				useMaxWidth: true
			},
			sequenceDiagram: {
				diagramMarginX: 50, // - margin to the right and left of the sequence diagram
				diagramMarginY: 10, // - margin to the over and under the sequence diagram
				actorMargin: 50, // - Margin between actors
				width: 150, // - Width of actor boxes
				height: 65, // - Height of actor boxes00000000001111
				boxMargin: 10, // - Margin around l01oop boxes
				boxTextMargin: 5, // - margin around the text in loop/alt/opt boxes
				noteMargin: 10, // - margin around notes
				messageMargin: 35, // - Space between messages
				mirrorActors: true, // - mirror actors under diagram
				bottomMarginAdj: 1, // - Depending on css styling this might need adjustment. Prolongs the edge of the diagram downwards
				useMaxWidth: true, // - when this flag is set the height and width is set to 100% and is then scaling with the available space if not the absolute space required is used
			},
			gantt: {
				titleTopMargin: 25, // - margin top for the text over the gantt diagram
				barHeight: 20, // - the height of the bars in the graph
				barGap: 4, // - the margin between the different activities in the gantt diagram
				topPadding: 50, // - margin between title and gantt diagram and between axis and gantt diagram.
				leftPadding: 75, // - the space allocated for the section name to the left of the activities.
				gridLineStartPadding: 35, // - Vertical starting position of the grid lines
				fontSize: 11, // - font size ...
				fontFamily: '"Open-Sans", "sans-serif"', // - font family ...
				numberSectionStyles: 3, // - the number of alternating section styles
				/** axisFormatter: // - formatting of the axis, this might need adjustment to match your locale and preferences
					[
			        // Within a day
			        ['%I:%M', function (d) {
			            return d.getHours();
			        }],
			        // Monday a week
			        ['w. %U', function (d) {
			            return d.getDay() == 1;
			        }],
			        // Day within a week (not monday)
			        ['%a %d', function (d) {
			            return d.getDay() && d.getDate() != 1;
			        }],
			        // within a month
			        ['%b %d', function (d) {
			            return d.getDate() != 1;
			        }],
			        // Month
			        ['%m-%y', function (d) {
			            return d.getMonth();
			        }]] **/
			}
		}
	}
]);