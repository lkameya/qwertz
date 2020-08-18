let app = require('./http-server');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let interval;
// Also mount the app here
io.on('request', app);

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

http.listen(5000, () => {
  console.log('listening on *:5000');
});


