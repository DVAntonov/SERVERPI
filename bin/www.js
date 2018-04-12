#!/usr/bin/env node

/**
 * Module dependencies.
 */
"use strict";
var app = require('../app');
var debug = require('debug')('serverpi-v1:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

console.log('Server running on 8080');

const Gpio = require('../server/gpio');
//подключаем socket.io
const io = require('socket.io').listen(server);

//Инициализируем ПИны
let gpio1 = new Gpio({pin:1});
let gpio2 = new Gpio({pin:2});
let gpio3 = new Gpio({pin:3});
let gpio4 = new Gpio({pin:4});
let gpio5 = new Gpio({pin:5});


//Выходы приводим в исходное состояние 0
gpio1.write(1);
gpio2.write(0);
gpio3.write(1);
gpio4.write(0);
gpio5.write(0);


//информируем о подключениях
io.on('connection', function (socket) {
  console.log('We have new connection!');
  socket.on('ReqSetGPIO', function (data) {
    console.log(data.message);
    switch (data.message) {
      case 1:
        gpio1.write(data.val);
        break;
      case 2:
        gpio2.write(data.val);
        break;
      case 3:
        gpio3.write(data.val);
        break;
      case 4:
        gpio4.write(data.val);
        break;
      case 5:
        gpio5.write(data.val);
        break;
      };
  });
});
//посылаем данные всем клиентам
function send_test_data() {
    var message1;
    var message2;
    var message3;
    var message4;
    var message5;
    gpio1.read()
        .then((state)=>{
              // console.log(state);//state of pin 5
              if (state == 0) {
                  message1 = "off";
                //  console.log(message1);
                              }
              else {
                  message1 = "on";
                  //console.log(message1);
                    }
              io.emit ('StateGpio1', {message: message1});
            });
            gpio2.read()
                .then((state)=>{
                      //console.log(state);//state of pin 5
                      if (state == 0) {
                          message2 = "off";
                          //console.log(message2);
                                      }
                      else {
                          message2 = "on";
                          //console.log(message2);
                            }
                      io.emit ('StateGpio2', {message: message2});
                    });
                    gpio3.read()
                        .then((state)=>{
                              //console.log(state);//state of pin 5
                              if (state == 0) {
                                  message3 = "off";
                                //  console.log(message3);
                                              }
                              else {
                                  message3 = "on";
                                  //console.log(message3);
                                    }
                              io.emit ('StateGpio3', {message: message3});
                            });
                      gpio4.read()
                                .then((state)=>{
                                      //console.log(state);//state of pin 5
                                      if (state == 0) {
                                          message4 = "off";
                                          //console.log(message4);
                                                      }
                                      else {
                                          message4 = "on";
                                          //console.log(message4);
                                            }
                                      io.emit ('StateGpio4', {message: message4});
                                    });
                      gpio5.read()
                                        .then((state)=>{
                                              //console.log(state);//state of pin 5
                                              if (state == 0) {
                                                  message5 = "off";
                                                  //console.log(message5);
                                                              }
                                              else {
                                                  message5 = "on";
                                                  //console.log(message5);
                                                    }
                                              io.emit ('StateGpio5', {message: message5});
                                            });
                      };


//устанавливаем интервал отправки
setInterval (send_test_data, 1000);

// Получаем от клиента сигнал управления
/*io.on('ReqSetGPIO', function (data) {
  console.log('data');
  switch (data) {
    case 1:
      gpio1.write(1);
      break;
    case 2:
      gpio2.write(1);
      break;
    case 3:
      gpio3.write(1);
      break;
    case 4:
      gpio4.write(1);
      break;
    case 5:
      gpio5.write(1);
      break;
    };
});*/

//освобождаем gpio
//function unexportOnClose() {
//  gpio5.unexport();
//};

//вызывается при выходе пользователем
//process.on('SIGINT', unexportOnClose);
