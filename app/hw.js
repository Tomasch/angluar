var http = require('http');
var dir = './phones_y';
http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
	var fs = require('fs');
	var files = fs.readdirSync(dir);
	for(var i in files) {
		fs.readFile(files[i], 'utf8', function (err, data) {
			if (err) {
				console.log('Error: ' + err);
				return;
			}
			files[i] = JSON.parse(data);
		});
	}
	response.end('['+files.join()+']');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
