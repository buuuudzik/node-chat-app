var socket = io();

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (email) => {
  console.log('New email', email);
});

socket.on('greeting', (email) => {
  console.log('New email', email);
});

socket.on('newUser', (email) => {
  console.log('New email', email);
});