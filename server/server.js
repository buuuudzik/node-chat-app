const path = require('path');
const http = require('http');
var express = require('express');
var socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); // map /public on main path

io.on('connection', (socket) => {
  console.log('New user connection');
  
  socket.on('createMessage', (message) => {
    console.log('New message', message);
    
    message.createdAt = new Date().getTime();
    socket.emit('newMessage', message);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
});
