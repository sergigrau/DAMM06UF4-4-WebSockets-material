/*
 * comunicacions amb backend amb Node i WebSockets
 * @author  sergi.grau@fje.edu
 * @version 2.0 19.02.2016
 * format del document UTF-8
 *
 * CHANGELOG
 * 19.02.2016
 * - comunicacions amb backend amb Node i WebSockets
 *
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes el Clot
 */
var socket = io.connect('http://localhost:8888');
socket.emit('dadesDesDelClient', {
    dades: '123456'
});
socket.on('dadesDesDelServidor', function (data) {
    console.log('CLIENT -> dades rebudes del servidor->' + data.dades);
});