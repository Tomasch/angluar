'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatApp.phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
  function($scope, $http) {

$http.get("http://localhost:80/").success(function(phones) {
            //$scope.phones = phones;
	$scope.phones = $.parseJSON('[{"id":"HkMNOlYcpHg","name":"PSY - HANGOVER feat. Snoop Dogg M\/V","desc":"PSY - HANGOVER feat. Snoop Dogg M\/V]\r\n#PSY #HANGOVER\r\n\r\nAvailable on iTunes @ http:\/\/smarturl.it\/PsyHangoveriT"},{"id":"ypIGeNdJbJ4","name":"some text","desc":"some desc"}]');
        });
    $scope.orderProp = 'name';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
    //$scope.code = 'ypIGeNdJbJ4';
    $scope.code=$routeParams.phoneId;
    $scope.json = {"id":"ypIGeNdJbJ4","name":" some Name","desc":"some desc"};

  }]);


phonecatControllers.directive('myYoutube', function($sce) {
    return {
        restrict: 'EA',
        scope: { code:'=' },
        replace: true,
        template: '<div style="height:400px;"><iframe style="overflow:hidden;height:390px;width:640px" width="640px" height="390px" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
        link: function (scope) {
            scope.$watch('code', function (newVal) {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
                }
            });
        }
    };
});

/*phonecatControllers.controller('MainCtrl', function($scope, socket) {
	$scope.notes = [];

	// Incoming
	socket.on('onNoteCreated', function(data) {
		$scope.notes.push(data);
	});

	socket.on('onNoteDeleted', function(data) {
		$scope.handleDeletedNoted(data.id);
	});

	// Outgoing
	$scope.createNote = function() {
		var note = {
			id: new Date().getTime(),
			title: 'New Note',
			body: 'Pending'
		};

		$scope.notes.push(note);
		socket.emit('createNote', note);
	};

	$scope.deleteNote = function(id) {
		$scope.handleDeletedNoted(id);

		socket.emit('deleteNote', {id: id});
	};

	$scope.handleDeletedNoted = function(id) {
		var oldNotes = $scope.notes,
		newNotes = [];

		angular.forEach(oldNotes, function(note) {
			if(note.id !== id) newNotes.push(note);
		});

		$scope.notes = newNotes;
	}
});

phonecatControllers.directive('stickyNote', function(socket) {
	var controller = function($scope) {
			// Incoming
			socket.on('onNoteUpdated', function(data) {
				// Update if the same note
				if(data.id == $scope.note.id) {
					$scope.note.title = data.title;
					$scope.note.body = data.body;
				}				
			});

			// Outgoing
			$scope.updateNote = function(note) {
				socket.emit('updateNote', note);
			};

			$scope.deleteNote = function(id) {
				$scope.ondelete({
					id: id
				});
			};
		};

	return {
		restrict: 'A',
		controller: controller,
		scope: {
			note: '=',
			ondelete: '&'
		}
	};
});*/
