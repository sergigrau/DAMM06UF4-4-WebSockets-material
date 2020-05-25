window.onload = function() {
 
    var missatges = [];
    var socket = io.connect('https://localhost:8888');
    var entrada = document.getElementById("entrada");
    var boto = document.getElementById("enviar");
    var contingut = document.getElementById("contingut");
 
    socket.on('missatge', function (data) {
        if(data.missatge) {
            missatges.push(data.missatge);
            var html = '';
            for(var i=0; i<missatges.length; i++) {
                html += missatges[i] + '<br />';
            }
            contingut.innerHTML = html;
        } else {
            console.log("Problema:", data);
        }
    });
 
    boto.onclick = function() {
        var text = entrada.value;
        socket.emit('enviar', { missatge: text });
    };
 
};
