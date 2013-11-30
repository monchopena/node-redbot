
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , com = require('serialport');

var app = express();


//var arduino_port='/dev/ttyUSB0';

//var arduino_port='/dev/tty.usbserial-A6008btJ';

//var arduino_port='/dev/tty.usbserial-AD0265GN';

var arduino_port='/dev/tty.Bluetooth_Bee_V2-DevB';



var serialPort = new com.SerialPort(arduino_port, {
    baudrate: 9600,
    parser: com.parsers.readline('\n')
  });

serialPort.on('open',function() {
  console.log('Port open');
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var io = require('socket.io').listen(app.listen(app.get('port')));
io.set('log level', 1);
io.sockets.on('connection', function (socket) {


serialPort.on('data', function(data) {
  
  console.log(data);
  if (data>0) {
  	socket.emit('dist', data); 
  }

});

socket.on('move', function (data) {

	//console.log(data);
	serialPort.write("$"+data.type+"*\n", function(err, results) {
          console.log("$"+data.type+"*\n");
           if (err) {
            console.log(err);
          }
    });

});


});


