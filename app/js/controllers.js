'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatApp.phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone', 'socket', '$http',
  function($scope, Phone, socket, $http) {

   socket.on('onChange', function(data) {
	$scope.phones = Phone.query();
   });

    //if(!$scope.phones)
	$scope.phones = Phone.query();
    $scope.orderProp = 'age';
    $scope.passObj = function($ph) {
        console.log($ph.id);
	$scope.ph = $ph;
    }

   $scope.createNote = function() {
	var id = $('#add').val();
	console.log("createNote");
	$http.get('phones_y/phones.json').success(function(data) {
	    $http.get('http://gdata.youtube.com/feeds/api/videos/'+id+'?v=2&alt=jsonc').success(function(ytdata) {
		var entry = {"id":ytdata.data.id,"name":ytdata.data.title,"desc":ytdata.data.description};
        	data.push({"id":ytdata.data.id,"name":ytdata.data.title,"desc":ytdata.data.description});
		//console.log(JSON.stringify( angular.toJson(data) ));
		gdata = JSON.stringify( angular.toJson(data) );
		socket.emit('createNote', angular.toJson(data));

	   });
	});
	console.log(gdata);
	socket.emit('Change', $scope.phones);
	$scope.phones = Phone.query();
   }

   $scope.deleteNote = function($id) {
	$http.get('phones_y/phones.json').success(function(data) {
	   	var oldPhones = $scope.phones;
		newPhones = [];
		var brk = true;
		angular.forEach(oldPhones, function(data) {
			if(data.id !== id && brk) { newPhones.push(data); brk=false; }
		});

		$scope.phones = newPhones;
		socket.emit('createNote', angular.toJson(newPhones));
	});
	console.log("del: "+$scope.phone);
	socket.emit('Change', $scope.phones);
	$scope.phones = Phone.query();
  }
  }]);
/*  function($scope, $http) {
	console.log('siema');

$http.get("http://localhost:80/").success(function(phones) {
            $scope.phones = phones;
	console.log('siema');
	//$scope.phones = $.parseJSON('[{"id":"HkMNOlYcpHg","name":"PSY - HANGOVER feat. Snoop Dogg M\/V","desc":"PSY - HANGOVER feat. Snoop Dogg M\/V]\r\n#PSY #HANGOVER\r\n\r\nAvailable on iTunes @ http:\/\/smarturl.it\/PsyHangoveriT"},{"id":"ypIGeNdJbJ4","name":"some text","desc":"some desc"}]');
        });
    $scope.orderProp = 'name';
  }]);
*/
phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
	console.log(phone);
    });
    //$scope.code = 'ypIGeNdJbJ4';
    $scope.code=$routeParams.phoneId;
    //$scope.json = {"id":"ypIGeNdJbJ4","name":" some Name","desc":"some desc"};

  }]);


phonecatControllers.directive('myYoutube', function($sce) {
    return {
        restrict: 'EA',
        scope: { code:'=' },
        replace: true,
        template: '<div style="height:400px;"><iframe style="overflow:hidden;height:390px;width:640px" width="640px" height="390px" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',//<h1>{{name}}</h1><p>{{desc}}</p>',
        link: function (scope) {
            scope.$watch('code', function (newVal) {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
		    $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+newVal+'?v=2&alt=jsonc',function(data,status,xhr){
			    document.getElementById('title').innerHTML = data.data.title;
			    document.getElementById('desc').innerHTML = data.data.description;
			});
                }
            });
        }
    };
});

phonecatControllers.controller('MainCtrl', function($scope, socket) {
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
/*
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
