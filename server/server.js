const path = require('path');
const http = require('http');
var express = require('express');
var socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation.js');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); // map /public on main path

io.on('connection', (socket) => {
  console.log('New user connection');  
  
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required.');
    };
    
    socket.join(params.room);
    // socket.leave('The Office Fans);
    
    // io.emit -> io.to('The Office Fans)
    // socket.broadcast.emit -> socket.broadcast.to('The Office Fans).emit
    // socket.emit
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });
  
  
  socket.on('createMessage', (message, callback) => {
    console.log('New message', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });
  
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
});
