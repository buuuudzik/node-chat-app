const path = require('path');
const http = require('http');
var express = require('express');
var socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); // map /public on main path

io.on('connection', (socket) => {
  console.log('New user connection');
  socket.emit('greeting', generateMessage('Admin', 'Welcome to the chat app'));
  
  socket.broadcast.emit('newUser', generateMessage('Admin', 'New user joined'));
  
  socket.on('createMessage', (message) => {
    console.log('New message', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
});
