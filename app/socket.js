var express = require('express'),
	phonecatApp = express(),
	server = require('http').createServer(phonecatApp),
	io = require('socket.io').listen(server);

phonecatApp.configure(function() {
    phonecatApp.use(express.static(__dirname));
});

io.sockets.on('connection', function(socket) {
/*	socket.on('createNote', function(data) {
		socket.broadcast.emit('onNoteCreated', data);
	});
*/
	socket.on('Change', function(data) {
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
