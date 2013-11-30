//const HOST='192.168.1.113';
const HOST='localhost';
const PORT='3000';
const SERVER_SOCKET='http://'+HOST+':'+PORT;

var socket = io.connect(SERVER_SOCKET);

socket.on('dist', function (data) {
                            
                            $("#dist").html(data);

                    });

function move (type) {

	socket.emit('move', { type: type });
	

}