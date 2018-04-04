const Gpio = require('orange-pi-gpio');

//let gpio1 = new Gpio({pin:1});
//let gpio2 = new Gpio({pin:2});
//let gpio3 = new Gpio({pin:4});
let gpio5 = new Gpio({pin:5});


gpio5.write(0);


//let StateGpio1=12;
exports.StateGpio1 = 11;
exports.StateGpio2 = 12;
exports.StateGpio3 = 13;
exports.StateGpio4 = 14;
//exports.StateGpio5 = gpio5.read();

gpio5.read()
  .then((state)=>{
    exports.StateGpio5 = state
        console.log(state); //state of pin 5
  });

//подключаем socket.io
//*var io = require('socket.io').listen(server);

//информируем о подключениях
//io.on('connection', function (socket) {
//  console.log('We have new connection!');
//});
//посылаем данные всем клиентам
//function send_test_data() {
//  var test_message;
//  if (gpio5.read() == 0) {
//     test_message = "gpio_off";
//  }
//  else {
  //   test_message = "gpio_on";
//  }
//  io.emit ('test_data', {message: test_message});
//}

//устанавливаем интервал отправки
//setInterval (send_test_data, 1000);

//освобождаем gpio
//function unexportOnClose() {
  //gpio5.unexport();
//};

//вызывается при выходе пользователем
//process.on('SIGINT', unexportOnClose);
