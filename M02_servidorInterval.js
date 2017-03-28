/*
 * document comunicacions amb backend amb Node i WebSockets
	@author sergi grau, sergi.grau@fje.edu
	@version 1.0
	date 	07/04/2014
	format del document UTF-8

	CHANGELOG
	07/04/2014
	document comunicacions amb backend amb Node i WebSockets
	27.03.2017
	Actualització pacquets node
	NOTES
	ORIGEN
	Desenvolupament en entorn client. Escola del Clot
 */

var app = require('http').createServer(handler), io = require('socket.io').listen(app), fs = require('fs');

app.listen(8888);

function handler(req, res) {
	fs.readFile(__dirname + '/index.html', function(err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}

		res.writeHead(200);
		res.end(data);
	});
}

io.sockets.on('connection', function(socket) {
	socket.on('dadesDesDelClient', function(data) {
		console.log('SERVIDOR -> dades rebudes del client->' + data.dades);
	});

	setInterval(function() {
		socket.emit('dadesDesDelServidor', {
			dades : 'dades des del servidor'
		});

	}, 1);
});
