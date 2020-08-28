let app = require('./http-server');
var http = require('http').createServer(app);
var io = require('socket.io')(http, { origins: '*:*'});
let interval;
// Also mount the app here
io.on('request', app);

io.origins((origin, callback) => {
  callback(null, true);
});

const messages = [
  { text: 'Mensagem 1' } ,
  { text: 'Mensagem 2' } ,
];

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => socket.emit('messages', messages), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });

  socket.on('new-message', (msg) => {
    console.log('message: ' + msg);
    messages.push({ text: msg});
    socket.emit('messages', messages);
  });

  socket.emit('messages', messages);
});


http.listen(process.env.PORT || 5000, () => {
  console.log('listening on *:5000');
});


