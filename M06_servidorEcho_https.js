/*
 * Servidor amb NodeJS que utilitza comunicacions amb WebSockets
 * @author  sergi.grau@fje.edu
 * @version 2.0 19.02.2016
 * format del document UTF-8
 *
 * CHANGELOG
 * 19.02.2016
 * - Servidor amb NodeJS que utilitza comunicacions amb WebSockets
 *
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes el Clot
 */
var app = require('http').createServer(onRequest);
var io = require('socket.io').listen(app);
var fs = require('fs');
var url = require("url");

console.log('servidor iniciat');
app.listen(8888);

function onRequest(req, res) {
		var pathname = url.parse(req.url).pathname;
		if (pathname == '/') {			
             fs.readFile(__dirname + '/M01_echo.html',
              function (err, data) {
                if (err) {
                  res.writeHead(500);
                  return res.end('Error carregant pàgina');
                }
                res.writeHead(200);
                res.end(data);
              });

		} else if (pathname == '/M01_echo.js') {
            fs.readFile(__dirname + '/M01_echo.js',
              function (err, data) {
                if (err) {
                  res.writeHead(500);
                  return res.end('Error carregant pàgina');
                }
                res.writeHead(200);
                res.end(data);
              });
		} else {
			res.writeHead(404, {
				"Content-Type" : "text/html; charset=utf-8"
			});
			sortida = "404 NOT FOUND";
			res.write(sortida);
			res.end();
		}
}


io.sockets.on('connection', function (socket) {
  socket.emit('dadesDesDelServidor', { dades: 'ABC' });
  socket.on('dadesDesDelClient', function (data) {
    console.log('SERVIDOR -> dades rebudes del client->'+data.dades);
  });
});