var express = require('express'),
	phonecatApp = express(),
	server = require('http').createServer(phonecatApp),
	io = require('socket.io').listen(server)

phonecatApp.configure(function() {
    phonecatApp.use(express.static(__dirname));
});

io.sockets.on('connection', function(socket) {
	socket.on('createNote', function(data) {
		console.log(data);
		fs = require("fs");
		fs.writeFile( "./app/phones_y/phones.json", data , "utf8", function (err) {
			if (err) throw err;
			console.log('It\'s saved! in same location.');
		});
		//socket.broadcast.emit('onNoteCreated', data);
	});

	socket.on('Change', function(data) {
		//console.log(data);
		socket.broadcast.emit('onChange', data);
	});

/*	socket.on('moveNote', function(data){
		socket.broadcast.emit('onNoteMoved', data);
	});
*/
	//socket.on('deleteNote', function(data){
	//	socket.broadcast.emit('onNoteDeleted', data);
	//});
});

server.listen(1337);
