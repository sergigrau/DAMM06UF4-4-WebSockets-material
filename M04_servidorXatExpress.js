/*
 * document comunicacions amb backend amb Node i WebSockets
 * utilitza Express
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

const express = require("express");
let app = express();
let port = 8888;

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("index");
});
 
const io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

io.sockets.on('connection', function (socket) {
    socket.emit('missatge', { missatge: 'Benvingut' });
    socket.on('enviar', function (data) {
        io.sockets.emit('missatge', data);
    });
});
