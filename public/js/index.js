var socket = io();

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('New email', message);
  
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  
  $('#messages').append(li);
});


$('#message-form').on('submit', function(e) {
  e.preventDefault();
  
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function() {
    
  });
});


var locationButton = $('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')  
  };
  
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
  }, function() {
    alert('Unable to fetch location.');
  });
});