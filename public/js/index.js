var socket = io();
        
socket.on('connect', () => {
  console.log('Connected to server');
  
  socket.emit('createMessage', {
    from: 'tony@example.com',
    text: 'what\'s up all'
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (email) => {
  console.log('New email', email);
});